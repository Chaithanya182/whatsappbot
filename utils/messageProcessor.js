class MessageProcessor {
    constructor(products, responses) {
        this.products = products;
        this.responses = responses;
        
        // Keywords for different intents
        this.keywords = {
            greeting: ['hello', 'hi', 'namaste', 'namaskar', 'vanakkam', 'hey'],
            pricing: ['price', 'rate', 'cost', 'ela', 'entha', 'amount', 'rupees'],
            order: ['order', 'buy', 'purchase', 'kavali', 'konnali', 'teesuko'],
            help: ['help', 'cheppu', 'cheppandi', 'guide', 'assist'],
            products: ['pickle', 'achar', 'pickles', 'varieties'],
            availability: ['available', 'stock', 'ready', 'unda'],
            delivery: ['delivery', 'deliver', 'reach', 'pampu', 'raavu']
        };
        
        // Product name variations
        this.productVariations = {
            'mango': ['mango', 'mamidi', 'mamidikaya', 'aam'],
            'tomato': ['tomato', 'tamata', 'tamatar', 'thakkali'],
            'gongura': ['gongura', 'gongura', 'pulichakaya', 'ambadi'],
            'lemon': ['lemon', 'nimma', 'nimbu', 'nimmakaya'],
            'mixed': ['mixed', 'mix', 'variety', 'varieties', 'kalipi']
        };
    }
    
    processMessage(message, session) {
        const lowerMessage = message.toLowerCase();
        const words = lowerMessage.split(/\s+/);
        
        // Detect intent
        const intent = this.detectIntent(lowerMessage, words);
        
        // Detect mentioned products
        const mentionedProducts = this.detectProducts(lowerMessage);
        
        // Generate response based on intent and products
        let response = this.generateResponse(intent, mentionedProducts, session);
        
        // Determine if recommendations should be included
        const includeRecommendations = this.shouldIncludeRecommendations(intent, mentionedProducts, session);
        
        // Track product interest
        let productInterest = null;
        if (mentionedProducts.length > 0) {
            productInterest = mentionedProducts[0]; // Track the first mentioned product
        }
        
        return {
            message: response,
            intent,
            mentionedProducts,
            includeRecommendations,
            productInterest
        };
    }
    
    detectIntent(message, words) {
        const intents = [];
        
        // Check each intent category
        for (const [intent, keywords] of Object.entries(this.keywords)) {
            const matchCount = keywords.filter(keyword => 
                message.includes(keyword) || words.includes(keyword)
            ).length;
            
            if (matchCount > 0) {
                intents.push({ intent, score: matchCount });
            }
        }
        
        // Sort by score and return highest
        if (intents.length > 0) {
            intents.sort((a, b) => b.score - a.score);
            return intents[0].intent;
        }
        
        // Default intent based on message characteristics
        if (words.length <= 2) {
            return 'greeting';
        }
        
        return 'general';
    }
    
    detectProducts(message) {
        const detectedProducts = [];
        
        for (const [product, variations] of Object.entries(this.productVariations)) {
            for (const variation of variations) {
                if (message.includes(variation)) {
                    if (!detectedProducts.includes(product)) {
                        detectedProducts.push(product);
                    }
                    break;
                }
            }
        }
        
        return detectedProducts;
    }
    
    generateResponse(intent, mentionedProducts, session) {
        const isNewUser = session.messageCount <= 1;
        
        switch (intent) {
            case 'greeting':
                return isNewUser ? this.responses.greeting.new : this.responses.greeting.returning;
                
            case 'pricing':
                if (mentionedProducts.length > 0) {
                    return this.getProductPricing(mentionedProducts);
                }
                return this.getAllPricing();
                
            case 'order':
                if (mentionedProducts.length > 0) {
                    return this.getOrderInfo(mentionedProducts[0]);
                }
                return this.responses.order.general;
                
            case 'help':
                return this.responses.help.menu;
                
            case 'products':
                return this.getProductCatalog();
                
            case 'availability':
                if (mentionedProducts.length > 0) {
                    return this.getAvailabilityInfo(mentionedProducts);
                }
                return this.responses.availability.general;
                
            case 'delivery':
                return this.responses.delivery.info;
                
            default:
                if (mentionedProducts.length > 0) {
                    return this.getProductInfo(mentionedProducts[0]);
                }
                return this.responses.default;
        }
    }
    
    getProductPricing(products) {
        let response = "📋 Pickle Prices:\n\n";
        
        for (const productKey of products) {
            const product = this.products[productKey];
            if (product) {
                response += `🥒 ${product.name}: ₹${product.price} (${product.size})\n`;
            }
        }
        
        response += "\n💬 Mee peru cheppandi order ki!";
        return response;
    }
    
    getAllPricing() {
        let response = "📋 Maaku Available Pickle Prices:\n\n";
        
        for (const [key, product] of Object.entries(this.products)) {
            response += `🥒 ${product.name}: ₹${product.price} (${product.size})\n`;
        }
        
        response += "\n💬 Emina kavali? Cheppandi!";
        return response;
    }
    
    getProductInfo(productKey) {
        const product = this.products[productKey];
        if (!product) {
            return this.responses.notFound;
        }
        
        let response = `🥒 ${product.name} Pickle\n\n`;
        response += `💰 Price: ₹${product.price} (${product.size})\n`;
        response += `📝 Description: ${product.description}\n`;
        response += `🌶️ Spice Level: ${product.spiceLevel}\n\n`;
        response += "Order cheyyali ante mee peru cheppandi! 📞";
        
        return response;
    }
    
    getOrderInfo(productKey) {
        const product = this.products[productKey];
        if (!product) {
            return this.responses.notFound;
        }
        
        let response = `✅ ${product.name} Order Details:\n\n`;
        response += `💰 Price: ₹${product.price} (${product.size})\n`;
        response += `⏰ Ready Time: 2-3 hours\n`;
        response += `🚚 Delivery: Available in Hyderabad\n\n`;
        response += "Confirm cheyyali ante:\n";
        response += "1️⃣ Mee full name\n";
        response += "2️⃣ Complete address\n";
        response += "3️⃣ Phone number\n\n";
        response += "Ivanni send cheyandi! 📲";
        
        return response;
    }
    
    getProductCatalog() {
        let response = "🏪 Maa Pickle Varieties:\n\n";
        
        for (const [key, product] of Object.entries(this.products)) {
            response += `🥒 ${product.name} - ₹${product.price}\n`;
            response += `   ${product.description}\n\n`;
        }
        
        response += "Emina kavali? Type cheyandi! 💬";
        return response;
    }
    
    getAvailabilityInfo(products) {
        let response = "✅ Stock Status:\n\n";
        
        for (const productKey of products) {
            const product = this.products[productKey];
            if (product) {
                // Simulate stock status (in real app, check actual inventory)
                const inStock = Math.random() > 0.1; // 90% chance in stock
                const status = inStock ? "Available ✅" : "Out of Stock ❌";
                response += `🥒 ${product.name}: ${status}\n`;
            }
        }
        
        response += "\nOrder cheseddam? Cheppandi! 📞";
        return response;
    }
    
    shouldIncludeRecommendations(intent, mentionedProducts, session) {
        // Include recommendations for certain intents
        const recommendationIntents = ['pricing', 'products', 'order'];
        
        if (recommendationIntents.includes(intent)) {
            return true;
        }
        
        // Include for new users on general queries
        if (session.messageCount <= 2 && intent === 'general') {
            return true;
        }
        
        // Include if user asked about specific products
        if (mentionedProducts.length > 0) {
            return true;
        }
        
        return false;
    }
}

module.exports = MessageProcessor;
