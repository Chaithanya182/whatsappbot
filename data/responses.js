const responses = {
    greeting: {
        new: "🙏 Namaskaaram! TeluguPickleBot ki welcome! 🥒\n\nMemu authentic Andhra pickles chestham. Em kavali cheppandi!\n\n📱 Type 'help' for menu.",
        returning: "🙏 Welcome back! Ela unnaru? 🥒\n\nInko order cheseddam? Em kavali cheppandi!"
    },
    
    help: {
        menu: "📋 TeluguPickleBot Help Menu:\n\n" +
              "🥒 'pickles' - All varieties chudali\n" +
              "💰 'prices' - Rate list kavali\n" +
              "🛒 'order [pickle name]' - Order cheyyali\n" +
              "📦 'delivery' - Delivery info\n" +
              "📞 'contact' - Contact details\n\n" +
              "Simply pickle name type cheyandi info kosam!"
    },
    
    order: {
        general: "🛒 Order Process:\n\n" +
                "1️⃣ Pickle variety select cheyandi\n" +
                "2️⃣ Mee full name\n" +
                "3️⃣ Complete address\n" +
                "4️⃣ Phone number\n\n" +
                "Example: 'Order mango pickle'\n" +
                "Taruvata details adugutham! 📝"
    },
    
    delivery: {
        info: "🚚 Delivery Information:\n\n" +
              "📍 Available Areas: Hyderabad & surroundings\n" +
              "⏰ Delivery Time: 4-6 hours\n" +
              "💰 Delivery Charges: ₹50 (Free above ₹500)\n" +
              "📦 Packaging: Airtight containers\n\n" +
              "Same day delivery available! 🚀"
    },
    
    availability: {
        general: "✅ Andaru pickles ready ga unnayi!\n\n" +
                "Fresh ga prepare chesamu. Order cheyandi! 🥒"
    },
    
    abuse: {
        firstWarning: "🙏 Memu respectful conversation prefer chestham.\n" +
                     "Professional ga matladandi please. 🤝\n\n" +
                     "Pickles gurinchi matladukondaam! 🥒",
        
        secondWarning: "⚠️ Warning: Please maintain decency.\n" +
                      "Inka inappropriate messages vaste block avvutharu.\n\n" +
                      "Business purpose kosam matladandi. 🥒",
        
        finalWarning: "🚫 Final Warning: Account temporarily blocked.\n" +
                     "24 hours taruvata try cheyandi.\n\n" +
                     "Professional behavior maintain cheyandi. 🙏"
    },
    
    promotions: {
        welcome: "Welcome offer: First order meedha 10% discount! 🎉\nCode: WELCOME10",
        loyalty: "Loyalty bonus: Mee regular orders ki special discount! 🌟\nNext order meedha 15% OFF!",
        bulk: "Bulk order special: 3+ pickles order chesthe 20% discount! 💰",
        festival: "Festival special offer running! Contact cheyandi details kosam! 🎊"
    },
    
    recommendations: {
        prefix: "Mee kosam special suggestions:",
        seasonal: "Ee season ki best pickles:",
        complementary: "Ee pickle tho baguntundhi:",
        popular: "Most popular choices:"
    },
    
    error: "😅 Sorry, technical issue. Please try again!\n" +
           "Malli message cheyandi! 🔄",
    
    notFound: "🤔 Aa pickle variety ledu maadhaggara.\n" +
              "Available pickles chudali ante 'pickles' type cheyandi! 🥒",
    
    default: "🥒 TeluguPickleBot here!\n\n" +
             "Pickles gurinchi adugandi - prices, varieties, ordering!\n" +
             "Type 'help' for menu. 📋",
    
    rateLimited: "⏱️ Too many messages! Please wait a moment.\n" +
                "Konchem time gap lo message cheyandi. 🙏",
    
    blocked: "🚫 Account temporarily blocked.\n" +
            "Professional ga matladataniki ready ayyaka contact cheyandi. ⏰\n\n" +
            "24 hours wait cheyandi please. 🙏",
    
    contact: "📞 Contact Details:\n\n" +
            "📱 WhatsApp: Same number\n" +
            "📧 Email: info@telugupickles.com\n" +
            "📍 Address: Hyderabad, Telangana\n" +
            "⏰ Timing: 9 AM - 8 PM\n\n" +
            "Direct call cheyyochu! 📞"
};

module.exports = {
    responses
};
