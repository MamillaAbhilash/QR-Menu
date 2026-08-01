export const CATEGORIES = [
  { id: 'all', name: 'All Dishes', icon: 'Utensils' },
  { id: 'starters', name: 'Starters & Small Bites', icon: 'Soup' },
  { id: 'mains', name: 'Signature Mains', icon: 'CookingPot' },
  { id: 'desserts', name: 'Artisanal Desserts', icon: 'IceCream' },
  { id: 'beverages', name: 'Craft Beverages', icon: 'GlassWater' }
];

export const INITIAL_TABLES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Table ${i + 1}`,
  capacity: i % 2 === 0 ? 4 : 2,
  status: i === 1 ? 'occupied' : i === 3 ? 'waiter_called' : i === 6 ? 'bill_requested' : 'available',
  qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`http://localhost:5173/?table=${i + 1}`)}`
}));

export const INITIAL_DISHES = [
  {
    id: 'dish-1',
    name: 'Truffle Mushroom Arancini',
    category: 'starters',
    price: 14.50,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 12,
    description: 'Crispy wild mushroom risotto balls stuffed with smoked mozzarella, drizzled with black truffle aioli and shaved parmesan.',
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Standard (4 pcs)', priceDelta: 0 },
      { id: 'v2', name: 'Large (6 pcs)', priceDelta: 4.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Truffle Aioli', price: 2.00 },
      { id: 'a2', name: 'Fresh Shaved Truffle', price: 5.50 }
    ]
  },
  {
    id: 'dish-2',
    name: 'Pan-Seared Wagyu Sliders',
    category: 'starters',
    price: 18.00,
    isVeg: false,
    isGlutenFree: false,
    isChefSpecial: true,
    spicyLevel: 1,
    prepTimeMinutes: 15,
    description: 'Mini brioche buns, A5 Wagyu beef patties, caramelized onion jam, aged cheddar, and house smoky secret sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Double Patty Sliders', priceDelta: 4.50 },
      { id: 'v2', name: 'Standard Trio (3 pcs)', priceDelta: 0 }
    ],
    addOns: [
      { id: 'a1', name: 'Crispy Bacon Strips', price: 2.50 },
      { id: 'a2', name: 'Extra Cheddar Cheese', price: 1.50 }
    ]
  },
  {
    id: 'dish-3',
    name: 'Burrata Caprese Salad',
    category: 'starters',
    price: 13.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 8,
    description: 'Fresh Puglia burrata, heirloom tomatoes, fresh basil, aged balsamic glaze, and extra virgin olive oil.',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [],
    addOns: [
      { id: 'a1', name: 'Prosciutto di Parma', price: 4.00 }
    ]
  },
  {
    id: 'dish-4',
    name: 'Filet Mignon with Herb Butter',
    category: 'mains',
    price: 36.00,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 22,
    description: 'Prime 8oz grass-fed filet mignon served with garlic rosemary compound butter, roasted asparagus, and truffle mash.',
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Medium Rare', priceDelta: 0 },
      { id: 'v2', name: 'Medium', priceDelta: 0 },
      { id: 'v3', name: 'Well Done', priceDelta: 0 }
    ],
    addOns: [
      { id: 'a1', name: 'Grilled Tiger Prawns (Surf & Turf)', price: 8.50 },
      { id: 'a2', name: 'Wild Peppercorn Sauce', price: 2.50 }
    ]
  },
  {
    id: 'dish-5',
    name: 'Lobster & Crab Linguine',
    category: 'mains',
    price: 29.50,
    isVeg: false,
    isGlutenFree: false,
    isChefSpecial: true,
    spicyLevel: 1,
    prepTimeMinutes: 18,
    description: 'Fresh artisanal pasta tossed with succulent butter-poached lobster tail, blue crab meat, cherry tomatoes, white wine, and chili flakes.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Regular Portion', priceDelta: 0 },
      { id: 'v2', name: 'Gluten-Free Penne Swap', priceDelta: 2.00 }
    ],
    addOns: [
      { id: 'a1', name: 'Extra Garlic Bread', price: 3.00 }
    ]
  },
  {
    id: 'dish-6',
    name: 'Wild Mushroom & Spinach Risotto',
    category: 'mains',
    price: 21.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 16,
    description: 'Creamy Carnaroli rice cooked with porcini broth, baby spinach, toasted pine nuts, and aged Parmesan reggiano.',
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [],
    addOns: [
      { id: 'a1', name: 'Grilled Tofu Cubes', price: 3.00 },
      { id: 'a2', name: 'Truffle Oil Drizzle', price: 2.00 }
    ]
  },
  {
    id: 'dish-7',
    name: 'Wood-Fired Pizza Margherita Supreme',
    category: 'mains',
    price: 18.50,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 14,
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, aromatic basil leaves, and cold-pressed extra virgin olive oil.',
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: '10 inch Personal', priceDelta: -3.00 },
      { id: 'v2', name: '14 inch Large Shareable', priceDelta: 0 }
    ],
    addOns: [
      { id: 'a1', name: 'Burrata Ball Topping', price: 4.50 },
      { id: 'a2', name: 'Jalapeño Slices', price: 1.50 }
    ]
  },
  {
    id: 'dish-8',
    name: 'Molten Belgian Chocolate Lava Cake',
    category: 'desserts',
    price: 11.50,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 10,
    description: 'Warm dark chocolate cake with a gooey warm liquid center, served alongside Madagascar vanilla bean gelato.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [],
    addOns: [
      { id: 'a1', name: 'Extra Gelato Scoop', price: 3.00 },
      { id: 'a2', name: 'Fresh Raspberry Puree', price: 1.50 }
    ]
  },
  {
    id: 'dish-9',
    name: 'Classic Sicilian Tiramisu',
    category: 'desserts',
    price: 10.00,
    isVeg: true,
    isGlutenFree: false,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Espresso-soaked ladyfingers layered with rich whipped mascarpone cream and dusted with Valrhona cocoa powder.',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [],
    addOns: [
      { id: 'a1', name: 'Shot of Amaretto Liqueur', price: 4.00 }
    ]
  },
  {
    id: 'dish-10',
    name: 'Smoky Bourbon Old Fashioned',
    category: 'beverages',
    price: 15.00,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: true,
    spicyLevel: 0,
    prepTimeMinutes: 4,
    description: 'Small-batch Kentucky Bourbon, aromatic bitters, raw cane sugar, infused with hickory wood smoke in a crystal glass.',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [],
    addOns: [
      { id: 'a1', name: 'Double Shot Reserve', price: 5.00 }
    ]
  },
  {
    id: 'dish-11',
    name: 'Fresh Dragonfruit Mint Breeze Mocktail',
    category: 'beverages',
    price: 8.50,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 5,
    description: 'Muddled fresh red dragonfruit, garden mint, lime juice, elderflower syrup, and sparkling soda water.',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [],
    addOns: [
      { id: 'a1', name: 'Add Chia Seeds', price: 1.00 }
    ]
  },
  {
    id: 'dish-12',
    name: 'Artisanal Cold Brew Coffee',
    category: 'beverages',
    price: 6.50,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: false,
    spicyLevel: 0,
    prepTimeMinutes: 2,
    description: 'Single-origin Ethiopian beans slow-steeped for 20 hours. Served over clear ice sphere.',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    variations: [
      { id: 'v1', name: 'Black Cold Brew', priceDelta: 0 },
      { id: 'v2', name: 'Oat Milk Cold Foam', priceDelta: 1.50 },
      { id: 'v3', name: 'Vanilla Sweet Cream', priceDelta: 1.50 }
    ],
    addOns: []
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
        id: 'dish-1',
        name: 'Truffle Mushroom Arancini',
        quantity: 1,
        unitPrice: 14.50,
        selectedVariation: 'Standard (4 pcs)',
        addOns: ['Extra Truffle Aioli ($2.00)'],
        specialInstructions: 'Extra crispy please'
      },
      {
        id: 'dish-10',
        name: 'Smoky Bourbon Old Fashioned',
        quantity: 2,
        unitPrice: 15.00,
        selectedVariation: null,
        addOns: [],
        specialInstructions: ''
      }
    ],
    totalAmount: 46.50,
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
        id: 'dish-4',
        name: 'Filet Mignon with Herb Butter',
        quantity: 1,
        unitPrice: 36.00,
        selectedVariation: 'Medium Rare',
        addOns: ['Grilled Tiger Prawns ($8.50)'],
        specialInstructions: 'Sauce on the side'
      }
    ],
    totalAmount: 44.50,
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
        id: 'dish-7',
        name: 'Wood-Fired Pizza Margherita Supreme',
        quantity: 1,
        unitPrice: 18.50,
        selectedVariation: '14 inch Large Shareable',
        addOns: [],
        specialInstructions: ''
      },
      {
        id: 'dish-8',
        name: 'Molten Belgian Chocolate Lava Cake',
        quantity: 2,
        unitPrice: 11.50,
        selectedVariation: null,
        addOns: ['Extra Gelato Scoop ($3.00)'],
        specialInstructions: 'Serve with dessert spoons'
      }
    ],
    totalAmount: 47.50,
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
