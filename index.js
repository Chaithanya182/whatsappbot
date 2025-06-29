const express = require('express');
const axios = require('axios');
const AbuseDetector = require('./utils/abuseDetector');
const SessionManager = require('./utils/sessionManager');
const RecommendationEngine = require('./utils/recommendationEngine');
const MessageProcessor = require('./utils/messageProcessor');
const { products, businessInfo } = require('./data/products');
const { responses } = require('./data/responses');

const app = express();
app.use(express.json());

// Configuration
const GUPSHUP_API_KEY = process.env.GUPSHUP_API_KEY || 'cfpmwgqzd6vyyifaxdhmanmz6q892s9w';
const SOURCE_NUMBER = process.env.SOURCE_NUMBER || '917834811114';
const BOT_NAME = 'Alekhyaa Chitti Pickles Bot';
const PORT = process.env.PORT || 5000;

// Initialize services
const abuseDetector = new AbuseDetector();
const sessionManager = new SessionManager();
const recommendationEngine = new RecommendationEngine(products);
const messageProcessor = new MessageProcessor(products, responses);

// Rate limiting map for abuse detection
const rateLimitMap = new Map();

// Middleware for rate limiting
const checkRateLimit = (phone) => {
    const now = Date.now();
    const userRequests = rateLimitMap.get(phone) || [];
    
    // Clean old requests (older than 1 minute)
    const recentRequests = userRequests.filter(timestamp => now - timestamp < 60000);
    
    if (recentRequests.length >= 10) {
        return false; // Rate limited
    }
    
    recentRequests.push(now);
    rateLimitMap.set(phone, recentRequests);
    return true;
};

// Send message function with error handling
const sendWhatsAppMessage = async (phone, message) => {
    try {
        const response = await axios.post('https://api.gupshup.io/sm/api/v1/msg', null, {
            params: {
                channel: 'whatsapp',
                source: SOURCE_NUMBER,
                destination: phone,
                message: `text:${message}`,
                'src.name': BOT_NAME
            },
            headers: {
                apikey: GUPSHUP_API_KEY
            },
            timeout: 10000 // 10 second timeout
        });
        
        console.log(`✅ Message sent to ${phone}: ${message.substring(0, 50)}...`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to send message to ${phone}:`, error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        return false;
    }
};

// Main webhook endpoint
app.post('/webhook', async (req, res) => {
    try {
        // Extract message data from Gupshup payload
        const payload = req.body.payload;
        if (!payload) {
            console.log('No payload received');
            return res.sendStatus(200);
        }

        const messageText = payload.payload?.text || '';
        const senderPhone = payload.sender?.phone;
        const messageType = payload.type;

        if (!senderPhone || !messageText) {
            console.log('Missing phone or message text');
            return res.sendStatus(200);
        }

        console.log(`📱 Received ${messageType} from ${senderPhone}: ${messageText}`);

        // Rate limiting check
        if (!checkRateLimit(senderPhone)) {
            await sendWhatsAppMessage(senderPhone, responses.rateLimited);
            return res.sendStatus(200);
        }

        // Get or create user session
        let session = sessionManager.getSession(senderPhone);
        if (!session) {
            session = sessionManager.createSession(senderPhone);
            console.log(`🆕 New user session created for ${senderPhone}`);
        }

        // Update session with new message
        sessionManager.updateSession(senderPhone, {
            lastMessage: messageText,
            lastActivity: new Date(),
            messageCount: session.messageCount + 1
        });

        // Check for abuse
        const abuseResult = abuseDetector.checkMessage(messageText);
        if (abuseResult.isAbusive) {
            const offenseCount = sessionManager.incrementOffenseCount(senderPhone);
            let warningMessage;

            if (offenseCount === 1) {
                warningMessage = responses.abuse.firstWarning;
            } else if (offenseCount === 2) {
                warningMessage = responses.abuse.secondWarning;
            } else {
                warningMessage = responses.abuse.finalWarning;
                // Block user temporarily
                sessionManager.updateSession(senderPhone, { 
                    blocked: true, 
                    blockExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
                });
            }

            await sendWhatsAppMessage(senderPhone, warningMessage);
            console.log(`⚠️ Abuse detected from ${senderPhone}. Offense count: ${offenseCount}`);
            return res.sendStatus(200);
        }

        // Check if user is blocked
        if (session.blocked && session.blockExpiry && new Date() < session.blockExpiry) {
            await sendWhatsAppMessage(senderPhone, responses.blocked);
            return res.sendStatus(200);
        }

        // Process the message and get response
        const processedResponse = messageProcessor.processMessage(messageText, session);
        
        // Get personalized recommendations if applicable
        let recommendations = '';
        if (processedResponse.includeRecommendations) {
            const userRecommendations = recommendationEngine.getRecommendations(session);
            if (userRecommendations.length > 0) {
                recommendations = '\n\n🌟 ' + responses.recommendations.prefix + '\n';
                recommendations += userRecommendations.map(product => 
                    `• ${product.name} - ₹${product.price} (${product.size})`
                ).join('\n');
            }
        }

        // Check for promotional offers
        let promotion = '';
        if (session.messageCount === 1) {
            promotion = '\n\n🎉 ' + responses.promotions.welcome;
        } else if (session.messageCount % 5 === 0 && session.messageCount > 5) {
            promotion = '\n\n🔥 ' + responses.promotions.loyalty;
        }

        // Combine response with recommendations and promotions
        const finalResponse = processedResponse.message + recommendations + promotion;

        // Update session with interaction data
        if (processedResponse.productInterest) {
            sessionManager.addProductInterest(senderPhone, processedResponse.productInterest);
        }

        // Send response
        await sendWhatsAppMessage(senderPhone, finalResponse);

        // Log session analytics
        console.log(`📊 Session stats for ${senderPhone}: Messages: ${session.messageCount}, Interests: ${session.productInterests?.join(', ') || 'None'}`);

    } catch (error) {
        console.error('❌ Webhook error:', error);
        // Try to send error message to user if we have their phone
        const phone = req.body.payload?.sender?.phone;
        if (phone) {
            await sendWhatsAppMessage(phone, responses.error);
        }
    }

    res.sendStatus(200);
});

// Health check endpoint
app.get('/', (req, res) => {
    const stats = sessionManager.getStats();
    res.json({
        business: {
            name: businessInfo.name,
            status: '✅ WhatsApp Bot Live & Enhanced!',
            location: businessInfo.location,
            phone: businessInfo.phone,
            email: businessInfo.email,
            customerStats: businessInfo.customerStats
        },
        timestamp: new Date().toISOString(),
        features: [
            'Authentic Alekhyaa Chitti Pickles Catalog',
            'Abuse Detection with Telugu Warnings',
            'Personalized Product Recommendations',
            'Session-based User Tracking',
            'Smart Promotional Offers (Mutton 10% OFF)',
            'Telugu-English Mixed Language Support',
            'Rate Limiting Protection',
            'Veg/Non-Veg/Spices Categories'
        ],
        webhook: {
            endpoint: '/webhook',
            method: 'POST',
            description: 'Gupshup WhatsApp webhook handler'
        },
        stats: {
            totalSessions: stats.totalSessions,
            activeSessions: stats.activeSessions,
            totalMessages: stats.totalMessages,
            blockedUsers: stats.blockedUsers
        },
        catalog: {
            totalProducts: Object.keys(products).length,
            categories: Object.keys(products).reduce((acc, key) => {
                const category = products[key].category;
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {}),
            priceRange: {
                min: Math.min(...Object.values(products).map(p => p.price)),
                max: Math.max(...Object.values(products).map(p => p.price))
            }
        }
    });
});

// Analytics endpoint
app.get('/analytics', (req, res) => {
    const stats = sessionManager.getStats();
    const productStats = sessionManager.getProductInterestStats();
    
    res.json({
        userStats: stats,
        productInterests: productStats,
        abuseStats: abuseDetector.getStats(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ${businessInfo.name} WhatsApp Bot running on port ${PORT}`);
    console.log(`📊 Features: Authentic Catalog, Abuse Detection, Personalized Offers, Smart Recommendations`);
    console.log(`🏪 Products: ${Object.keys(products).length} items | Location: ${businessInfo.location}`);
    console.log(`📞 Contact: ${businessInfo.phone} | Email: ${businessInfo.email}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/`);
    console.log(`📈 Analytics: http://localhost:${PORT}/analytics`);
    console.log(`🔗 Webhook endpoint: http://localhost:${PORT}/webhook`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Server shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Server interrupted, shutting down gracefully');
    process.exit(0);
});
