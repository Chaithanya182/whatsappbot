class AbuseDetector {
    constructor() {
        // Telugu and English abusive words/phrases
        this.abusiveWords = [
            // English abusive words
            'fuck', 'shit', 'damn', 'bitch', 'bastard', 'asshole', 'idiot', 'stupid',
            // Telugu abusive words (transliterated)
            'dengey', 'koduku', 'boothu', 'rakasi', 'bewakoof', 'gadida', 'kukka',
            'dengina', 'thevala', 'rakshasi', 'buddi leni', 'gadida la'
        ];
        
        // Spam patterns
        this.spamPatterns = [
            /(.)\1{4,}/, // Repeated characters (aaaaa)
            /[A-Z]{5,}/, // All caps words longer than 4 chars
            /(\w+\s+){20,}/, // Messages with too many repeated words
        ];
        
        this.stats = {
            totalChecks: 0,
            abuseDetected: 0,
            spamDetected: 0
        };
    }
    
    checkMessage(message) {
        this.stats.totalChecks++;
        
        const lowerMessage = message.toLowerCase();
        let isAbusive = false;
        let reason = '';
        
        // Check for abusive words
        for (const word of this.abusiveWords) {
            if (lowerMessage.includes(word)) {
                isAbusive = true;
                reason = 'abusive_language';
                this.stats.abuseDetected++;
                break;
            }
        }
        
        // Check for spam patterns if not already flagged
        if (!isAbusive) {
            for (const pattern of this.spamPatterns) {
                if (pattern.test(message)) {
                    isAbusive = true;
                    reason = 'spam_pattern';
                    this.stats.spamDetected++;
                    break;
                }
            }
        }
        
        // Check message length (too long might be spam)
        if (!isAbusive && message.length > 1000) {
            isAbusive = true;
            reason = 'message_too_long';
            this.stats.spamDetected++;
        }
        
        return {
            isAbusive,
            reason,
            confidence: isAbusive ? 0.8 : 0.0
        };
    }
    
    getStats() {
        return { ...this.stats };
    }
    
    // Add new abusive words (for admin use)
    addAbusiveWord(word) {
        if (!this.abusiveWords.includes(word.toLowerCase())) {
            this.abusiveWords.push(word.toLowerCase());
            return true;
        }
        return false;
    }
}

module.exports = AbuseDetector;
