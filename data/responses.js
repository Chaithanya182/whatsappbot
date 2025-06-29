const responses = {
    greeting: {
        new: "🙏 Namaskaaram! Alekhyaa Chitti Pickles ki welcome! 🥒\n\nMemu traditional Andhra pickles handcraft chestham - generations nunchi vachina recipes tho!\n\n📱 Type 'help' for menu.\n\n🏆 12,000+ happy customers, 21,000+ orders delivered!",
        returning: "🙏 Welcome back! Ela unnaru? 🥒\n\nMee favorite pickle inko order cheseddam? Em kavali cheppandi!"
    },
    
    help: {
        menu: "📋 Alekhyaa Chitti Pickles Help Menu:\n\n" +
              "🥒 'pickles' - All varieties chudali (13+ items)\n" +
              "💰 'prices' - Rate list kavali\n" +
              "🛒 'order [pickle name]' - Order cheyyali\n" +
              "📦 'delivery' - Delivery info\n" +
              "📞 'contact' - Contact details\n" +
              "🌶️ 'veg' - Vegetarian pickles\n" +
              "🍖 'nonveg' - Non-veg pickles\n" +
              "🧂 'spices' - HomeMade spices & podis\n\n" +
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
              "📍 Shipping: All over India\n" +
              "💰 FREE Shipping on orders above ₹2500\n" +
              "📦 Safe packaging in airtight containers\n" +
              "⏰ Processing time: 1-2 days\n" +
              "🏠 Based in: Rajahmundry, East Godavari, AP\n\n" +
              "Bulk orders accepted! Minimum order: 250g 🥒"
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
        welcome: "Welcome offer: First order meedha special discount! 🎉\nFree shipping above ₹2500!",
        loyalty: "Loyalty bonus: Mee regular orders ki special discount! 🌟\n12,000+ customers trust us!",
        bulk: "Bulk order special: Large quantities ki better rates! 💰\nContact cheyandi wholesale prices kosam!",
        festival: "Festival special: Mutton pickle meedha 10% OFF! 🎊\nCode: SAVE10",
        mutton: "Special offer: Mutton pickle meedha 10% discount! 🔥\nCode: SAVE10 - Limited time!"
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
    
    contact: "📞 Alekhyaa Chitti Pickles Contact:\n\n" +
            "📱 Phone: +91 7305607487\n" +
            "📧 Email: contact@chittipickles.in\n" +
            "🌐 Website: www.chittipickles.in\n" +
            "📍 Address: Rajahmundry, East Godavari, AP 533101\n" +
            "⏰ Support: 24/7 available\n\n" +
            "Direct call cheyyochu! WhatsApp kuda available! 📞"
};

module.exports = {
    responses
};
