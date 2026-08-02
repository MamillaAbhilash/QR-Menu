export const CATEGORIES = [
  { id: 'all', name: 'All Dishes', icon: 'Utensils' },
  { id: 'soups', name: 'Soups', icon: 'Soup' },
  { id: 'starters', name: 'Starters', icon: 'CookingPot' },
  { id: 'biryani', name: 'Biryani & Rice', icon: 'Rice' },
  { id: 'mandi', name: 'Mandi & Grills', icon: 'Drumstick' },
  { id: 'bakery', name: 'Bakery Items', icon: 'Bread' },
  { id: 'desserts', name: 'Desserts', icon: 'IceCream' },
  { id: 'beverages', name: 'Beverages', icon: 'GlassWater' }
];

export const INITIAL_TABLES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Table ${i + 1}`,
  capacity: i % 2 === 0 ? 4 : 2,
  status: i === 1 ? 'occupied' : i === 3 ? 'waiter_called' : i === 6 ? 'bill_requested' : 'available'
}));

export const INITIAL_DISHES = [
  // ==================== SOUPS ====================
  {
    id: 'dish-1',
    name: 'Tomato Basil Soup',
    category: 'soups',
    price: 7.50,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 10,
    description: 'Slow-simmered ripe tomatoes blended with fresh basil, cream, and a hint of garlic. Served with herbed croutons.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular Bowl', priceDelta: 0 },
      { id: 'v2', name: 'Large Bowl', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Cheese Croutons', price: 1.50 },
      { id: 'a2', name: 'Cream Swirl', price: 0.75 }
    ]
  },
  {
    id: 'dish-2',
    name: 'Sweet Corn Soup',
    category: 'soups',
    price: 8.00,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 10,
    description: 'Classic Chinese-style soup with sweet corn kernels, finely chopped vegetables, and a light pepper finish.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular Bowl', priceDelta: 0 },
      { id: 'v2', name: 'Large Bowl', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Corn', price: 1.00 },
      { id: 'a2', name: 'Vinegar & Chilli Sauce', price: 0.50 }
    ]
  },
  {
    id: 'dish-3',
    name: 'Hot & Sour Soup',
    category: 'soups',
    price: 8.50,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 2,
    prepTimeMinutes: 12,
    description: 'A tangy and spicy Indo-Chinese broth with tofu, bamboo shoots, mushrooms, and a peppery kick.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular Bowl', priceDelta: 0 },
      { id: 'v2', name: 'Large Bowl', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Tofu', price: 1.50 },
      { id: 'a2', name: 'Extra Spicy', price: 0.00 }
    ]
  },
  {
    id: 'dish-4',
    name: 'Cream of Mushroom Soup',
    category: 'soups',
    price: 9.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 12,
    description: 'Velvety soup made from wild mushrooms, sautéed garlic, shallots, and a touch of cream, finished with parsley.',
    imageUrl: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular Bowl', priceDelta: 0 },
      { id: 'v2', name: 'Large Bowl', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Garlic Bread Side', price: 2.50 },
      { id: 'a2', name: 'Truffle Oil Drizzle', price: 2.00 }
    ]
  },
  {
    id: 'dish-5',
    name: 'Chicken Clear Soup',
    category: 'soups',
    price: 8.50,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 1,
    prepTimeMinutes: 12,
    description: 'Light and aromatic clear broth with shredded chicken, spring onions, and a subtle hint of ginger.',
    imageUrl: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular Bowl', priceDelta: 0 },
      { id: 'v2', name: 'Large Bowl', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Chicken', price: 2.00 },
      { id: 'a2', name: 'Boiled Egg', price: 1.00 }
    ]
  },
  {
    id: 'dish-6',
    name: 'Lentil Rasam Soup',
    category: 'soups',
    price: 7.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 10,
    description: 'South Indian style tangy lentil soup tempered with mustard seeds, curry leaves, tomato, and black pepper.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular Bowl', priceDelta: 0 },
      { id: 'v2', name: 'Large Bowl', priceDelta: 1.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Ghee Tadka', price: 1.00 },
      { id: 'a2', name: 'Extra Pepper', price: 0.00 }
    ]
  },

  // ==================== STARTERS ====================
  {
    id: 'dish-7',
    name: 'Paneer Tikka',
    category: 'starters',
    price: 12.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 15,
    description: 'Char-grilled cottage cheese cubes marinated in spiced yogurt, bell peppers, and onions. Served with mint chutney.',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Half Plate', priceDelta: 0 },
      { id: 'v2', name: 'Full Plate', priceDelta: 4.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Butter Baste', price: 1.50 },
      { id: 'a2', name: 'Cheese Cube Extra', price: 2.00 }
    ]
  },
  {
    id: 'dish-8',
    name: 'Chicken 65',
    category: 'starters',
    price: 13.50,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 3,
    prepTimeMinutes: 15,
    description: 'Fiery deep-fried chicken bites tossed with curry leaves, ginger-garlic paste, and a secret spice blend.',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Half Plate', priceDelta: 0 },
      { id: 'v2', name: 'Full Plate', priceDelta: 4.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Curry Leaves', price: 0.50 },
      { id: 'a2', name: 'Raita Dip', price: 1.00 }
    ]
  },
  {
    id: 'dish-9',
    name: 'Gobi Manchurian',
    category: 'starters',
    price: 11.00,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 2,
    prepTimeMinutes: 15,
    description: 'Crispy cauliflower florets tossed in a savory Indo-Chinese garlic-soy sauce with spring onions.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Half Plate', priceDelta: 0 },
      { id: 'v2', name: 'Full Plate', priceDelta: 3.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Sesame', price: 0.50 },
      { id: 'a2', name: 'Schezwan Sauce', price: 0.75 }
    ]
  },
  {
    id: 'dish-10',
    name: 'Tandoori Chicken (Half)',
    category: 'starters',
    price: 14.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 20,
    description: 'Chicken legs marinated overnight in yogurt and tandoori spices, roasted in clay oven until smoky.',
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Half Chicken', priceDelta: 0 },
      { id: 'v2', name: 'Full Chicken', priceDelta: 6.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Mint Chutney Extra', price: 0.50 },
      { id: 'a2', name: 'Butter Naan Pair', price: 3.00 }
    ]
  },
  {
    id: 'dish-11',
    name: 'Crispy Veg Spring Rolls',
    category: 'starters',
    price: 9.50,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 1,
    prepTimeMinutes: 12,
    description: 'Golden-fried rolls stuffed with shredded vegetables, glass noodles, and a sweet chili dipping sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: '4 Pieces', priceDelta: 0 },
      { id: 'v2', name: '8 Pieces', priceDelta: 4.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Sweet Chili Dip Extra', price: 0.50 },
      { id: 'a2', name: 'Cheese Filling', price: 1.50 }
    ]
  },
  {
    id: 'dish-12',
    name: 'Chilli Garlic Prawns',
    category: 'starters',
    price: 16.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 15,
    description: 'Plump prawns flash-fried with garlic, dried red chilies, and spring onions. A coastal favorite.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular', priceDelta: 0 },
      { id: 'v2', name: 'Large', priceDelta: 5.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Garlic Butter Drizzle', price: 1.50 },
      { id: 'a2', name: 'Lemon Wedge Extra', price: 0.25 }
    ]
  },
  {
    id: 'dish-13',
    name: 'Mutton Seekh Kebab',
    category: 'starters',
    price: 15.50,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 18,
    description: 'Hand-minced mutton kebabs seasoned with roasted spices, coriander, and mint, grilled on skewers.',
    imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: '4 Skewers', priceDelta: 0 },
      { id: 'v2', name: '6 Skewers', priceDelta: 5.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Mint Chutney Extra', price: 0.50 },
      { id: 'a2', name: 'Salad Platter', price: 1.00 }
    ]
  },

  // ==================== BIRYANI & RICE ====================
  {
    id: 'dish-14',
    name: 'Hyderabadi Chicken Dum Biryani',
    category: 'biryani',
    price: 16.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 25,
    description: 'Fragrant basmati rice layered with marinated chicken, saffron, mint, and fried onions, slow-cooked on dum.',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Single', priceDelta: 0 },
      { id: 'v2', name: 'Double (2 Servings)', priceDelta: 6.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Raita', price: 1.00 },
      { id: 'a2', name: 'Boiled Egg', price: 1.50 },
      { id: 'a3', name: 'Extra Chicken Piece', price: 3.50 }
    ]
  },
  {
    id: 'dish-15',
    name: 'Mutton Dum Biryani',
    category: 'biryani',
    price: 19.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 30,
    description: 'Tender mutton pieces cooked on slow dum with aged basmati rice, saffron, and a medley of whole spices.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Single', priceDelta: 0 },
      { id: 'v2', name: 'Double (2 Servings)', priceDelta: 7.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Raita', price: 1.00 },
      { id: 'a2', name: 'Extra Mutton Piece', price: 4.00 }
    ]
  },
  {
    id: 'dish-16',
    name: 'Veg Biryani',
    category: 'biryani',
    price: 13.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 1,
    prepTimeMinutes: 20,
    description: 'Basmati rice layered with garden vegetables, mint, saffron, and aromatic biryani masala, served with raita.',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Single', priceDelta: 0 },
      { id: 'v2', name: 'Double (2 Servings)', priceDelta: 5.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Raita', price: 1.00 },
      { id: 'a2', name: 'Paneer Cubes', price: 2.50 }
    ]
  },
  {
    id: 'dish-17',
    name: 'Egg Biryani',
    category: 'biryani',
    price: 13.50,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 2,
    prepTimeMinutes: 20,
    description: 'Flavorful basmati rice layered with spiced boiled eggs, caramelized onions, and fresh coriander.',
    imageUrl: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Single', priceDelta: 0 },
      { id: 'v2', name: 'Double (2 Servings)', priceDelta: 5.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Egg', price: 1.50 },
      { id: 'a2', name: 'Extra Raita', price: 1.00 }
    ]
  },
  {
    id: 'dish-18',
    name: 'Prawn Biryani',
    category: 'biryani',
    price: 18.50,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 25,
    description: 'Coastal-style biryani with plump prawns, turmeric rice, coconut, curry leaves, and a hint of lime.',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Single', priceDelta: 0 },
      { id: 'v2', name: 'Double (2 Servings)', priceDelta: 6.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Prawns', price: 4.00 },
      { id: 'a2', name: 'Coconut Chutney', price: 1.00 }
    ]
  },
  {
    id: 'dish-19',
    name: 'Jeera Rice with Dal Tadka',
    category: 'biryani',
    price: 11.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 1,
    prepTimeMinutes: 15,
    description: 'Cumin-tempered basmati rice served with a bowl of comforting yellow dal tempered with garlic and ghee.',
    imageUrl: 'https://images.unsplash.com/photo-1603371870952-267fc4e3edf0?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Single', priceDelta: 0 },
      { id: 'v2', name: 'Double (2 Servings)', priceDelta: 4.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Ghee', price: 0.75 },
      { id: 'a2', name: 'Papad', price: 1.00 }
    ]
  },

  // ==================== MANDI & GRILLS ====================
  {
    id: 'dish-20',
    name: 'Chicken Mandi',
    category: 'mandi',
    price: 17.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 1,
    prepTimeMinutes: 30,
    description: 'Traditional Yemeni-style roasted chicken over fragrant spiced basmati rice with mandi spices and house salad.',
    imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Half Chicken', priceDelta: 0 },
      { id: 'v2', name: 'Full Chicken', priceDelta: 7.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Rice', price: 2.00 },
      { id: 'a2', name: 'Mandi Spice Dip', price: 0.50 }
    ]
  },
  {
    id: 'dish-21',
    name: 'Mutton Mandi',
    category: 'mandi',
    price: 21.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 1,
    prepTimeMinutes: 35,
    description: 'Slow-roasted mutton served over fragrant mandi rice, garnished with fried onions, raisins, and almonds.',
    imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular', priceDelta: 0 },
      { id: 'v2', name: 'Large', priceDelta: 8.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Rice', price: 2.00 },
      { id: 'a2', name: 'Extra Gravy', price: 1.50 }
    ]
  },
  {
    id: 'dish-22',
    name: 'Fish Mandi',
    category: 'mandi',
    price: 19.50,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 30,
    description: 'Spice-crusted grilled fish served over mandi rice with a side of tahini sauce and lemon wedge.',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular', priceDelta: 0 },
      { id: 'v2', name: 'Large', priceDelta: 7.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Tahini Dip Extra', price: 1.00 },
      { id: 'a2', name: 'Grilled Veggies', price: 2.00 }
    ]
  },
  {
    id: 'dish-23',
    name: 'Lamb Mandi',
    category: 'mandi',
    price: 22.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 1,
    prepTimeMinutes: 35,
    description: 'Tender lamb shank slow-cooked with mandi spices and served over saffron basmati rice.',
    imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular', priceDelta: 0 },
      { id: 'v2', name: 'Large', priceDelta: 8.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Rice', price: 2.00 },
      { id: 'a2', name: 'Mint Raita', price: 1.00 }
    ]
  },
  {
    id: 'dish-24',
    name: 'Special Mixed Grill Platter',
    category: 'mandi',
    price: 26.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 2,
    prepTimeMinutes: 30,
    description: 'A grand platter of tandoori chicken, seekh kebabs, grilled prawns, and lamb chops with mint chutney.',
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'For 2', priceDelta: 0 },
      { id: 'v2', name: 'For 4', priceDelta: 12.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Garlic Naan', price: 3.00 },
      { id: 'a2', name: 'Extra Chutney', price: 0.75 }
    ]
  },
  {
    id: 'dish-25',
    name: 'Grilled Chicken BBQ',
    category: 'mandi',
    price: 15.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 2,
    prepTimeMinutes: 20,
    description: 'Char-grilled chicken quarters basted in smoky BBQ glaze, served with fries and coleslaw.',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Quarter', priceDelta: 0 },
      { id: 'v2', name: 'Half', priceDelta: 5.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra BBQ Sauce', price: 0.75 },
      { id: 'a2', name: 'Fries Upgrade', price: 1.50 }
    ]
  },

  // ==================== BAKERY ITEMS ====================
  {
    id: 'dish-26',
    name: 'Butter Croissant',
    category: 'bakery',
    price: 4.50,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Flaky, buttery, and freshly baked French croissant with a golden crisp exterior.',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Plain', priceDelta: 0 },
      { id: 'v2', name: 'Almond', priceDelta: 1.50 },
      { id: 'v3', name: 'Chocolate Filled', priceDelta: 1.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Butter & Jam', price: 0.75 },
      { id: 'a2', name: 'Hazelnut Spread', price: 1.00 }
    ]
  },
  {
    id: 'dish-27',
    name: 'Danish Pastry',
    category: 'bakery',
    price: 5.00,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Buttery layered pastry with a sweet filling, finished with a light sugar glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Apple', priceDelta: 0 },
      { id: 'v2', name: 'Cherry', priceDelta: 0.50 },
      { id: 'v3', name: 'Cream Cheese', priceDelta: 0.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Dusting of Powdered Sugar', price: 0.25 }
    ]
  },
  {
    id: 'dish-28',
    name: 'Cinnamon Roll',
    category: 'bakery',
    price: 5.50,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 8,
    description: 'Soft, warm roll swirled with cinnamon sugar and topped with cream cheese icing.',
    imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Classic', priceDelta: 0 },
      { id: 'v2', name: 'Extra Icing', priceDelta: 0.75 }
    ],
    addOns: [
      { id: 'a1', name: 'Warmed', price: 0.00 },
      { id: 'a2', name: 'Add Walnuts', price: 1.00 }
    ]
  },
  {
    id: 'dish-29',
    name: 'Garlic Bread',
    category: 'bakery',
    price: 6.00,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 1,
    prepTimeMinutes: 8,
    description: 'Crusty baguette slices brushed with garlic butter, herbs, and a touch of parmesan, toasted to perfection.',
    imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Classic', priceDelta: 0 },
      { id: 'v2', name: 'Cheese Garlic Bread', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Cheese', price: 1.50 },
      { id: 'a2', name: 'Marinara Dip', price: 1.00 }
    ]
  },
  {
    id: 'dish-30',
    name: 'Chocolate Fudge Brownie',
    category: 'bakery',
    price: 5.00,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Dense, gooey chocolate brownie loaded with chocolate chunks. Pairs beautifully with ice cream.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Plain', priceDelta: 0 },
      { id: 'v2', name: 'With Walnuts', priceDelta: 1.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Vanilla Ice Cream Scoop', price: 2.50 },
      { id: 'a2', name: 'Hot Fudge Drizzle', price: 1.00 }
    ]
  },
  {
    id: 'dish-31',
    name: 'Banana Walnut Bread',
    category: 'bakery',
    price: 4.50,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Moist banana bread studded with crunchy walnuts, served warm with a honey drizzle.',
    imageUrl: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Slice', priceDelta: 0 },
      { id: 'v2', name: 'Loaf (Serves 4)', priceDelta: 8.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Butter Spread', price: 0.50 },
      { id: 'a2', name: 'Honey Drizzle', price: 0.50 }
    ]
  },

  // ==================== DESSERTS ====================
  {
    id: 'dish-32',
    name: 'Gulab Jamun (2 pcs)',
    category: 'desserts',
    price: 6.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 8,
    description: 'Soft khoya dumplings deep-fried and soaked in warm rose-cardamom sugar syrup, garnished with pistachio.',
    imageUrl: 'https://images.unsplash.com/photo-1589119908995-c683764d2a1d?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: '2 Pieces', priceDelta: 0 },
      { id: 'v2', name: '4 Pieces', priceDelta: 4.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Vanilla Ice Cream Scoop', price: 2.50 },
      { id: 'a2', name: 'Silver Leaf', price: 0.50 }
    ]
  },
  {
    id: 'dish-33',
    name: 'Chocolate Lava Cake',
    category: 'desserts',
    price: 8.50,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 10,
    description: 'Warm dark chocolate cake with a molten center, served with a scoop of vanilla bean gelato.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Single', priceDelta: 0 },
      { id: 'v2', name: 'With Extra Gelato', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Fresh Raspberry Puree', price: 1.50 },
      { id: 'a2', name: 'Mint Leaf Garnish', price: 0.00 }
    ]
  },
  {
    id: 'dish-34',
    name: 'Tiramisu',
    category: 'desserts',
    price: 8.00,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Espresso-soaked ladyfingers layered with mascarpone cream and dusted with rich cocoa powder.',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Classic', priceDelta: 0 },
      { id: 'v2', name: 'Hazelnut', priceDelta: 1.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Shot of Espresso on Top', price: 1.00 },
      { id: 'a2', name: 'Extra Cocoa Dust', price: 0.25 }
    ]
  },
  {
    id: 'dish-35',
    name: 'Ice Cream Sundae',
    category: 'desserts',
    price: 7.50,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Three scoops of ice cream with chocolate sauce, whipped cream, nuts, and a cherry on top.',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Classic Sundae', priceDelta: 0 },
      { id: 'v2', name: 'Brownie Sundae', priceDelta: 2.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Chocolate Sauce', price: 0.75 },
      { id: 'a2', name: 'Sprinkles', price: 0.25 }
    ]
  },
  {
    id: 'dish-36',
    name: 'Shahi Kheer',
    category: 'desserts',
    price: 6.50,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 10,
    description: 'Creamy rice pudding slow-cooked with saffron, cardamom, nuts, and a touch of rose water.',
    imageUrl: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular', priceDelta: 0 },
      { id: 'v2', name: 'Large', priceDelta: 2.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Chopped Nuts Extra', price: 0.75 },
      { id: 'a2', name: 'Rabasri (Saffron Cream)', price: 1.00 }
    ]
  },

  // ==================== BEVERAGES ====================
  {
    id: 'dish-37',
    name: 'Cold Coffee',
    category: 'beverages',
    price: 6.50,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Frothy blended coffee with milk, sugar, and a scoop of vanilla ice cream for a creamy finish.',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular', priceDelta: 0 },
      { id: 'v2', name: 'With Ice Cream', priceDelta: 1.50 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Chocolate Syrup', price: 0.75 },
      { id: 'a2', name: 'Oat Milk Swap', price: 1.00 }
    ]
  },
  {
    id: 'dish-38',
    name: 'Mango Lassi',
    category: 'beverages',
    price: 6.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Refreshing yogurt-based drink blended with ripe Alphonso mangoes and a hint of cardamom.',
    imageUrl: 'https://images.unsplash.com/photo-1571006682889-52bb25d0f81d?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular', priceDelta: 0 },
      { id: 'v2', name: 'Large', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Pistachio Crush', price: 0.75 },
      { id: 'a2', name: 'Saffron Strands', price: 1.00 }
    ]
  },
  {
    id: 'dish-39',
    name: 'Masala Chai',
    category: 'beverages',
    price: 3.50,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 1,
    prepTimeMinutes: 5,
    description: 'Traditional Indian spiced tea brewed with ginger, cardamom, cinnamon, and fresh milk.',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular Cup', priceDelta: 0 },
      { id: 'v2', name: 'Large Cup', priceDelta: 1.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Ginger', price: 0.25 },
      { id: 'a2', name: 'Less Sweet', price: 0.00 }
    ]
  },
  {
    id: 'dish-40',
    name: 'Fresh Lime Soda',
    category: 'beverages',
    price: 4.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 3,
    description: 'Fizzy lime soda served sweet, salted, or mixed — a timeless thirst quencher.',
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Sweet', priceDelta: 0 },
      { id: 'v2', name: 'Salted', priceDelta: 0 },
      { id: 'v3', name: 'Mixed', priceDelta: 0 }
    ],
    addOns: [
      { id: 'a1', name: 'Mint Leaves', price: 0.25 },
      { id: 'a2', name: 'Ginger Crush', price: 0.50 }
    ]
  },
  {
    id: 'dish-41',
    name: 'Fresh Watermelon Juice',
    category: 'beverages',
    price: 5.50,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Chilled juice from hand-picked watermelons with a squeeze of lime and fresh mint.',
    imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular Glass', priceDelta: 0 },
      { id: 'v2', name: 'Large Glass', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Chaas Masala Sprinkle', price: 0.25 },
      { id: 'a2', name: 'Extra Mint', price: 0.25 }
    ]
  },
  {
    id: 'dish-42',
    name: 'Berry Smoothie Bowl Drink',
    category: 'beverages',
    price: 7.50,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 6,
    description: 'Thick blended drink of mixed berries, banana, and yogurt topped with granola and chia.',
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Drink Portion', priceDelta: 0 },
      { id: 'v2', name: 'Bowl Portion', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Chia Seeds', price: 0.75 },
      { id: 'a2', name: 'Granola Crunch', price: 1.00 }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-101',
    tableId: 2,
    tableName: 'Table 2',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    status: 'kitchen_preparing', // pending, kitchen_preparing, ready, served, completed, cancelled
    items: [
      {
        id: 'dish-14',
        name: 'Hyderabadi Chicken Dum Biryani',
        quantity: 1,
        unitPrice: 16.00,
        selectedVariation: 'Single',
        addOns: ['Extra Raita ($1.00)'],
        specialInstructions: 'Extra spicy please'
      },
      {
        id: 'dish-38',
        name: 'Mango Lassi',
        quantity: 2,
        unitPrice: 6.00,
        selectedVariation: 'Regular',
        addOns: [],
        specialInstructions: ''
      }
    ],
    totalAmount: 29.00,
    paymentStatus: 'unpaid'
  },
  {
    id: 'ORD-102',
    tableId: 4,
    tableName: 'Table 4',
    createdAt: new Date(Date.now() - 8 * 60000).toISOString(),
    status: 'pending',
    items: [
      {
        id: 'dish-8',
        name: 'Chicken 65',
        quantity: 1,
        unitPrice: 13.50,
        selectedVariation: 'Full Plate',
        addOns: ['Raita Dip ($1.00)'],
        specialInstructions: 'Make it extra crispy'
      }
    ],
    totalAmount: 14.50,
    paymentStatus: 'unpaid'
  },
  {
    id: 'ORD-103',
    tableId: 7,
    tableName: 'Table 7',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    status: 'served',
    items: [
      {
        id: 'dish-20',
        name: 'Chicken Mandi',
        quantity: 1,
        unitPrice: 17.00,
        selectedVariation: 'Half Chicken',
        addOns: [],
        specialInstructions: ''
      },
      {
        id: 'dish-33',
        name: 'Chocolate Lava Cake',
        quantity: 2,
        unitPrice: 8.50,
        selectedVariation: 'Single',
        addOns: ['Fresh Raspberry Puree ($1.50)'],
        specialInstructions: 'Serve warm'
      }
    ],
    totalAmount: 37.00,
    paymentStatus: 'unpaid'
  }
];

export const INITIAL_SERVICE_REQUESTS = [
  {
    id: 'SR-1',
    tableId: 4,
    tableName: 'Table 4',
    type: 'call_waiter', // call_waiter or request_bill
    reason: 'Water & Extra Napkins',
    createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
    status: 'active' // active or resolved
  },
  {
    id: 'SR-2',
    tableId: 7,
    tableName: 'Table 7',
    type: 'request_bill',
    reason: 'Requesting final bill (Credit Card)',
    createdAt: new Date(Date.now() - 1 * 60000).toISOString(),
    status: 'active'
  }
];

