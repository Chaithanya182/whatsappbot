const products = {
    // Vegetarian Pickles
    tomato: {
        name: "Tomato Pickle",
        price: 250,
        sizes: ["250g", "500g", "1kg"],
        description: "Juicy tomatoes slow-cooked with aromatic spices",
        spiceLevel: "Medium",
        category: "Veg Pickles",
        type: "vegetarian",
        ingredients: ["Tomatoes", "Green Chilies", "Garlic", "Tamarind", "Sesame Oil"],
        shelfLife: "6 months"
    },
    
    gongura: {
        name: "Gongura Pickle",
        price: 250,
        sizes: ["250g", "500g", "1kg"],
        description: "Andhra's famous sorrel leaves pickle - tangy and spicy",
        spiceLevel: "Hot",
        category: "Veg Pickles",
        type: "vegetarian",
        ingredients: ["Gongura Leaves", "Red Chilies", "Garlic", "Tamarind", "Sesame Oil"],
        shelfLife: "8 months"
    },
    
    aavakaya: {
        name: "Aavakaya (Mango Pickle)",
        price: 250,
        sizes: ["250g", "500g", "1kg"],
        description: "Handpicked raw mangoes sun-cured in traditional spices",
        spiceLevel: "Hot",
        category: "Veg Pickles",
        type: "vegetarian",
        ingredients: ["Raw Mango", "Red Chili Powder", "Turmeric", "Fenugreek", "Mustard Oil"],
        shelfLife: "1 year"
    },
    
    maagaya: {
        name: "Maagaya Pickle",
        price: 250,
        sizes: ["250g", "500g", "1kg"],
        description: "Traditional Andhra mango pickle with authentic taste",
        spiceLevel: "Medium",
        category: "Veg Pickles",
        type: "vegetarian",
        ingredients: ["Raw Mango", "Spice Mix", "Oil", "Salt"],
        shelfLife: "8 months"
    },

    // Non-Veg Pickles - Chicken
    chicken_boneless: {
        name: "Chicken Boneless Pickle",
        price: 429,
        sizes: ["250g", "500g", "1kg"],
        description: "High protein chicken breast slow-cooked with aromatic spices",
        spiceLevel: "Medium",
        category: "Chicken Pickles",
        type: "non-vegetarian",
        ingredients: ["Boneless Chicken", "Spice Mix", "Oil", "Garlic"],
        shelfLife: "3 months"
    },
    
    tokku_chicken: {
        name: "Tokku Chicken Pickle",
        price: 549,
        sizes: ["250g", "500g", "1kg"],
        description: "Spicy chicken tokku with traditional Andhra flavors",
        spiceLevel: "Hot",
        category: "Chicken Pickles",
        type: "non-vegetarian",
        ingredients: ["Chicken", "Special Tokku Spices", "Oil"],
        shelfLife: "3 months"
    },
    
    chicken_bone: {
        name: "Chicken Bone Pickle",
        price: 349,
        sizes: ["250g", "500g", "1kg"],
        description: "Traditional bone-in chicken pickle",
        spiceLevel: "Medium",
        category: "Chicken Pickles",
        type: "non-vegetarian",
        ingredients: ["Chicken with Bone", "Spice Mix", "Oil"],
        shelfLife: "3 months"
    },
    
    gongura_chicken: {
        name: "Gongura Chicken Pickle",
        price: 609,
        sizes: ["250g", "500g", "1kg"],
        description: "Premium chicken cooked with gongura leaves",
        spiceLevel: "Hot",
        category: "Chicken Pickles",
        type: "non-vegetarian",
        ingredients: ["Chicken", "Gongura Leaves", "Spices", "Oil"],
        shelfLife: "3 months"
    },
    
    mango_chicken: {
        name: "Mango Chicken Pickle",
        price: 609,
        sizes: ["250g", "500g", "1kg"],
        description: "Unique blend of chicken with raw mango flavors",
        spiceLevel: "Medium",
        category: "Chicken Pickles",
        type: "non-vegetarian",
        ingredients: ["Chicken", "Raw Mango", "Spices", "Oil"],
        shelfLife: "3 months"
    },

    // Mutton Pickle
    mutton: {
        name: "Mutton Pickle",
        price: 679,
        originalPrice: 755,
        discount: "10% OFF",
        discountCode: "SAVE10",
        sizes: ["250g", "500g", "1kg"],
        description: "Premium mutton pickle with rich spices",
        spiceLevel: "Hot",
        category: "Mutton Pickle",
        type: "non-vegetarian",
        ingredients: ["Mutton", "Premium Spice Mix", "Oil"],
        shelfLife: "3 months"
    },

    // Prawn Pickles
    regular_prawns: {
        name: "Regular Prawns Pickle",
        price: 579,
        sizes: ["250g", "500g", "1kg"],
        description: "Spicy, juicy prawns with authentic Andhra flavors. Ideal with rice or roti",
        spiceLevel: "Hot",
        category: "Prawn Pickles",
        type: "non-vegetarian",
        ingredients: ["Fresh Prawns", "Spice Mix", "Oil"],
        shelfLife: "2 months"
    },
    
    vein_free_prawns: {
        name: "Vein Free Prawns Pickle",
        price: 599,
        sizes: ["250g", "500g", "1kg"],
        description: "Cleaned and spiced vein-free prawns for pure indulgence",
        spiceLevel: "Hot",
        category: "Prawn Pickles",
        type: "non-vegetarian",
        ingredients: ["Vein-Free Prawns", "Premium Spices", "Oil"],
        shelfLife: "2 months"
    },

    // Spices & Powders
    kura_karam: {
        name: "Kura Karam (Spice)",
        price: 259,
        sizes: ["250g", "500g", "1kg"],
        description: "Traditional spice powder for curries",
        spiceLevel: "Hot",
        category: "HomeMade Spices & Podis",
        type: "spice",
        ingredients: ["Red Chilies", "Coriander", "Other Spices"],
        shelfLife: "1 year"
    },
    
    royyapottu_karappodi: {
        name: "Royyapottu Karappodi",
        price: 419,
        sizes: ["250g", "500g", "1kg"],
        description: "Special prawn powder for authentic taste",
        spiceLevel: "Hot",
        category: "HomeMade Spices & Podis",
        type: "spice",
        ingredients: ["Prawns", "Spices", "Red Chilies"],
        shelfLife: "8 months"
    },
    
    plain_karappodi: {
        name: "Plain Karappodi",
        price: 419,
        sizes: ["250g", "500g", "1kg"],
        description: "Traditional spice powder",
        spiceLevel: "Hot",
        category: "HomeMade Spices & Podis",
        type: "spice",
        ingredients: ["Red Chilies", "Spices"],
        shelfLife: "1 year"
    },
    
    nuvvu_pappu_karappodi: {
        name: "Nuvvu Pappu Karappodi",
        price: 419,
        sizes: ["250g", "500g", "1kg"],
        description: "Sesame and lentil spice powder",
        spiceLevel: "Medium",
        category: "HomeMade Spices & Podis",
        type: "spice",
        ingredients: ["Sesame Seeds", "Lentils", "Spices"],
        shelfLife: "8 months"
    },
    
    pachadi_karam: {
        name: "Pachadi Karam",
        price: 249,
        originalPrice: 1000,
        discount: "75% OFF",
        sizes: ["250g", "500g", "1kg"],
        description: "Special spice mix for pachadi preparation",
        spiceLevel: "Hot",
        category: "HomeMade Spices & Podis",
        type: "spice",
        ingredients: ["Red Chilies", "Tamarind", "Spices"],
        shelfLife: "1 year"
    }
};

// Product categories for better organization
const categories = {
    "Veg Pickles": ["tomato", "gongura", "aavakaya", "maagaya"],
    "Chicken Pickles": ["chicken_boneless", "tokku_chicken", "chicken_bone", "gongura_chicken", "mango_chicken"],
    "Prawn Pickles": ["regular_prawns", "vein_free_prawns"],
    "Mutton Pickle": ["mutton"],
    "HomeMade Spices & Podis": ["kura_karam", "royyapottu_karappodi", "plain_karappodi", "nuvvu_pappu_karappodi", "pachadi_karam"]
};

// Seasonal availability
const seasonalProducts = {
    summer: ["regular_prawns", "vein_free_prawns", "tomato"],
    monsoon: ["gongura", "gongura_chicken"],
    winter: ["aavakaya", "maagaya", "chicken_boneless"]
};

// Business information
const businessInfo = {
    name: "Alekhyaa Chitti Pickles",
    location: "Rajahmundry, East Godavari, Andhra Pradesh 533101",
    phone: "+91 7305607487",
    email: "contact@chittipickles.in",
    website: "www.chittipickles.in",
    established: "Traditional recipes passed down through generations",
    speciality: "Handcrafted small batch pickles using traditional Andhra recipes",
    freeShipping: "₹2500",
    customerStats: {
        happyCustomers: "12,000+",
        ordersFulfilled: "21,000+",
        productsDelivered: "33,500+"
    },
    minimumOrder: "250g",
    support: "24/7 support available"
};

module.exports = {
    products,
    categories,
    seasonalProducts,
    businessInfo
};
