const products = {
    mango: {
        name: "Mamidi Pickle",
        price: 450,
        size: "1kg",
        description: "Fresh raw mango pieces in traditional Telugu spices",
        spiceLevel: "Medium",
        category: "Traditional",
        ingredients: ["Raw Mango", "Red Chili Powder", "Turmeric", "Fenugreek", "Mustard Oil"],
        shelfLife: "6 months"
    },
    
    tomato: {
        name: "Tamata Pickle",
        price: 250,
        size: "500g",
        description: "Tangy tomato pickle with perfect spice blend",
        spiceLevel: "Mild",
        category: "Popular",
        ingredients: ["Tomatoes", "Green Chilies", "Garlic", "Tamarind", "Sesame Oil"],
        shelfLife: "4 months"
    },
    
    gongura: {
        name: "Gongura Pickle",
        price: 400,
        size: "500g",
        description: "Andhra's famous sorrel leaves pickle - tangy and spicy",
        spiceLevel: "Hot",
        category: "Signature",
        ingredients: ["Gongura Leaves", "Red Chilies", "Garlic", "Tamarind", "Sesame Oil"],
        shelfLife: "8 months"
    },
    
    lemon: {
        name: "Nimma Pickle",
        price: 350,
        size: "500g",
        description: "Zesty lemon pickle with traditional Andhra flavors",
        spiceLevel: "Medium",
        category: "Traditional",
        ingredients: ["Lemons", "Salt", "Turmeric", "Red Chili Powder", "Asafoetida"],
        shelfLife: "1 year"
    },
    
    mixed: {
        name: "Mixed Vegetable Pickle",
        price: 480,
        size: "1kg",
        description: "Assorted vegetables in rich pickle masala",
        spiceLevel: "Medium",
        category: "Premium",
        ingredients: ["Carrots", "Cauliflower", "Beans", "Mango", "Comprehensive Spice Mix"],
        shelfLife: "6 months"
    }
};

// Product categories for better organization
const categories = {
    traditional: ["mango", "lemon"],
    popular: ["tomato", "mixed"],
    signature: ["gongura"],
    premium: ["mixed"]
};

// Seasonal availability
const seasonalProducts = {
    summer: ["lemon", "mixed"],
    monsoon: ["gongura", "tomato"],
    winter: ["mango", "gongura"]
};

module.exports = {
    products,
    categories,
    seasonalProducts
};
