class SessionManager {
    constructor() {
        this.sessions = new Map();
        this.cleanupInterval = setInterval(() => {
            this.cleanupInactiveSessions();
        }, 60 * 60 * 1000); // Cleanup every hour
    }
    
    createSession(phone) {
        const session = {
            phone,
            createdAt: new Date(),
            lastActivity: new Date(),
            messageCount: 0,
            productInterests: [],
            offenseCount: 0,
            blocked: false,
            blockExpiry: null,
            preferredLanguage: 'mixed', // mixed, telugu, english
            orderHistory: [],
            lastMessage: '',
            promotionsSent: []
        };
        
        this.sessions.set(phone, session);
        return session;
    }
    
    getSession(phone) {
        return this.sessions.get(phone) || null;
    }
    
    updateSession(phone, updates) {
        const session = this.sessions.get(phone);
        if (session) {
            Object.assign(session, updates);
            session.lastActivity = new Date();
        }
        return session;
    }
    
    addProductInterest(phone, product) {
        const session = this.sessions.get(phone);
        if (session) {
            if (!session.productInterests.includes(product)) {
                session.productInterests.push(product);
            }
            // Keep only last 10 interests
            if (session.productInterests.length > 10) {
                session.productInterests = session.productInterests.slice(-10);
            }
        }
    }
    
    incrementOffenseCount(phone) {
        const session = this.sessions.get(phone);
        if (session) {
            session.offenseCount++;
            return session.offenseCount;
        }
        return 0;
    }
    
    addOrder(phone, orderDetails) {
        const session = this.sessions.get(phone);
        if (session) {
            session.orderHistory.push({
                ...orderDetails,
                timestamp: new Date()
            });
            // Keep only last 20 orders
            if (session.orderHistory.length > 20) {
                session.orderHistory = session.orderHistory.slice(-20);
            }
        }
    }
    
    getStats() {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        
        let activeSessions = 0;
        let totalMessages = 0;
        let blockedUsers = 0;
        
        for (const session of this.sessions.values()) {
            if (session.lastActivity > oneDayAgo) {
                activeSessions++;
            }
            totalMessages += session.messageCount;
            if (session.blocked && session.blockExpiry && now < session.blockExpiry) {
                blockedUsers++;
            }
        }
        
        return {
            totalSessions: this.sessions.size,
            activeSessions,
            totalMessages,
            blockedUsers
        };
    }
    
    getProductInterestStats() {
        const interests = {};
        
        for (const session of this.sessions.values()) {
            for (const interest of session.productInterests) {
                interests[interest] = (interests[interest] || 0) + 1;
            }
        }
        
        return interests;
    }
    
    cleanupInactiveSessions() {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        let cleaned = 0;
        for (const [phone, session] of this.sessions.entries()) {
            if (session.lastActivity < sevenDaysAgo) {
                this.sessions.delete(phone);
                cleaned++;
            }
        }
        
        if (cleaned > 0) {
            console.log(`🧹 Cleaned up ${cleaned} inactive sessions`);
        }
    }
    
    // Unblock user (for admin use)
    unblockUser(phone) {
        const session = this.sessions.get(phone);
        if (session) {
            session.blocked = false;
            session.blockExpiry = null;
            session.offenseCount = 0;
            return true;
        }
        return false;
    }
    
    // Get user profile for recommendations
    getUserProfile(phone) {
        const session = this.sessions.get(phone);
        if (!session) return null;
        
        return {
            messageCount: session.messageCount,
            productInterests: session.productInterests,
            orderHistory: session.orderHistory,
            preferredLanguage: session.preferredLanguage,
            daysSinceFirstContact: Math.floor((new Date() - session.createdAt) / (1000 * 60 * 60 * 24))
        };
    }
}

module.exports = SessionManager;
