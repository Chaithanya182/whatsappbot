class RecommendationEngine {
    constructor(products) {
        this.products = products;
        this.complementaryProducts = {
            'mango': ['gongura', 'mixed'],
            'tomato': ['gongura', 'lemon'],
            'gongura': ['mango', 'tomato'],
            'lemon': ['tomato', 'mixed'],
            'mixed': ['mango', 'gongura']
        };
    }
    
    getRecommendations(session, maxRecommendations = 2) {
        const recommendations = [];
        const userInterests = session.productInterests || [];
        const orderHistory = session.orderHistory || [];
        
        // If user has no interests, recommend popular products
        if (userInterests.length === 0) {
            return this.getPopularProducts(maxRecommendations);
        }
        
        // Find complementary products based on interests
        const complementarySet = new Set();
        for (const interest of userInterests) {
            const complements = this.complementaryProducts[interest] || [];
            complements.forEach(product => complementarySet.add(product));
        }
        
        // Remove products user has already shown interest in
        for (const interest of userInterests) {
            complementarySet.delete(interest);
        }
        
        // Remove products user has recently ordered
        const recentOrders = orderHistory.slice(-3).map(order => order.product);
        for (const ordered of recentOrders) {
            complementarySet.delete(ordered);
        }
        
        // Convert to product objects and limit
        const complementaryArray = Array.from(complementarySet);
        for (let i = 0; i < Math.min(complementaryArray.length, maxRecommendations); i++) {
            const productKey = complementaryArray[i];
            if (this.products[productKey]) {
                recommendations.push(this.products[productKey]);
            }
        }
        
        // If we don't have enough recommendations, fill with popular products
        if (recommendations.length < maxRecommendations) {
            const popular = this.getPopularProducts(maxRecommendations - recommendations.length);
            const existingNames = new Set(recommendations.map(p => p.name));
            
            for (const product of popular) {
                if (!existingNames.has(product.name)) {
                    recommendations.push(product);
                }
            }
        }
        
        return recommendations.slice(0, maxRecommendations);
    }
    
    getPopularProducts(count = 2) {
        // Return most popular products (hardcoded for now, could be dynamic based on orders)
        const popularOrder = ['mango', 'gongura', 'tomato', 'mixed', 'lemon'];
        const popular = [];
        
        for (let i = 0; i < Math.min(popularOrder.length, count); i++) {
            const productKey = popularOrder[i];
            if (this.products[productKey]) {
                popular.push(this.products[productKey]);
            }
        }
        
        return popular;
    }
    
    // Get seasonal recommendations
    getSeasonalRecommendations() {
        const month = new Date().getMonth() + 1; // 1-12
        
        // Summer months (April-June) - cooling pickles
        if (month >= 4 && month <= 6) {
            return ['lemon', 'mixed'];
        }
        
        // Monsoon months (July-September) - tangy pickles
        if (month >= 7 && month <= 9) {
            return ['gongura', 'tomato'];
        }
        
        // Winter months (October-March) - spicy pickles
        return ['mango', 'gongura'];
    }
    
    // Recommend based on user behavior patterns
    getBehaviorBasedRecommendations(session) {
        const profile = session;
        
        // New users - recommend starter pack
        if (profile.messageCount <= 3) {
            return ['tomato', 'mango']; // Easy starter pickles
        }
        
        // Frequent users - recommend premium products
        if (profile.messageCount > 10) {
            return ['mixed', 'gongura']; // Premium varieties
        }
        
        // Regular users - seasonal recommendations
        return this.getSeasonalRecommendations();
    }
    
    // Score products based on user preferences
    scoreProduct(productKey, session) {
        let score = 0;
        
        // Base popularity score
        const popularityScores = {
            'mango': 5,
            'gongura': 4,
            'tomato': 3,
            'mixed': 4,
            'lemon': 2
        };
        score += popularityScores[productKey] || 0;
        
        // Interest-based scoring
        if (session.productInterests?.includes(productKey)) {
            score += 10; // High score for expressed interest
        }
        
        // Complementary product scoring
        for (const interest of session.productInterests || []) {
            if (this.complementaryProducts[interest]?.includes(productKey)) {
                score += 3;
            }
        }
        
        // Seasonal bonus
        const seasonalProducts = this.getSeasonalRecommendations();
        if (seasonalProducts.includes(productKey)) {
            score += 2;
        }
        
        // Reduce score for recently ordered products
        const recentOrders = (session.orderHistory || []).slice(-2);
        if (recentOrders.some(order => order.product === productKey)) {
            score -= 5;
        }
        
        return score;
    }
}

module.exports = RecommendationEngine;
