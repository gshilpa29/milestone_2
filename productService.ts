import { Product, EmissionLevel } from '../types';

const PRODUCTS_DB_KEY = 'ecobazaar_products';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Vegan Lipstick',
    description: 'Long-lasting, vibrant lipstick made from 100% natural, plant-based ingredients.',
    price: 15.99,
    category: 'Cosmetics',
    image: 'https://picsum.photos/seed/lipstick/400/300',
    brand: 'PureBeauty',
    carbonScore: 94,
    emissionLevel: EmissionLevel.LOW,
    carbonData: {
      production: 0.15,
      transport: 0.1,
      packaging: 0.05,
      usage: 0,
      total: 0.3
    },
    materials: ['Candelilla Wax', 'Organic Shea Butter', 'Mineral Pigments'],
    manufactureDate: '2024-05-10',
    expectedLifespan: '2 years',
    repairabilityScore: 2,
    recyclingInstructions: 'Compost the outer bamboo casing. The inner aluminum tube is recyclable.',
    weight: '25g',
    dimensions: '7.5 x 2 x 2 cm',
    origin: 'France',
    lifecycleStages: [
      { stage: 'Sourcing', description: 'Organic ingredients sourced from fair-trade farms.', location: 'Brazil', icon: 'Leaf' },
      { stage: 'Production', description: 'Cold-pressed and mixed in a solar-powered facility.', location: 'France', icon: 'Factory' },
      { stage: 'Packaging', description: 'Housed in biodegradable bamboo and recycled aluminum.', location: 'France', icon: 'Package' }
    ],
    purchaseCount: 1240,
    salesTrend: [
      { month: 'Jan', sales: 80 },
      { month: 'Feb', sales: 120 },
      { month: 'Mar', sales: 150 },
      { month: 'Apr', sales: 190 },
      { month: 'May', sales: 240 },
      { month: 'Jun', sales: 310 }
    ],
    pointsValue: 150,
    priceComparison: [
      { site: 'Amazon', price: 18.50, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 17.99, url: 'https://flipkart.com' },
      { site: 'Myntra', price: 16.50, url: 'https://myntra.com' },
      { site: 'EcoBazaar', price: 15.99, url: '#', isBestValue: true }
    ]
  },
  {
    id: '7',
    name: 'Eco-Friendly Face Cream',
    description: 'Hydrating face cream in a refillable glass jar. Made with 100% natural plant extracts.',
    price: 32.00,
    category: 'Cosmetics',
    image: 'https://picsum.photos/seed/facecream/400/300',
    brand: 'GreenGlow',
    carbonScore: 89,
    emissionLevel: EmissionLevel.MEDIUM,
    carbonData: {
      production: 0.8,
      transport: 0.3,
      packaging: 0.1,
      usage: 0,
      total: 1.2
    },
    materials: ['Aloe Vera Extract', 'Organic Jojoba Oil', 'Recycled Glass Jar'],
    manufactureDate: '2024-03-22',
    expectedLifespan: '1 year (after opening)',
    repairabilityScore: 10,
    recyclingInstructions: 'Glass jar is 100% recyclable. Refill pods available at discounted rates.',
    weight: '150g',
    dimensions: '6 x 6 x 5 cm',
    origin: 'Germany',
    lifecycleStages: [
      { stage: 'Extraction', description: 'Steam distillation of plant extracts.', location: 'Italy', icon: 'Zap' },
      { stage: 'Bottling', description: 'Automated bottling in sterile, energy-efficient plant.', location: 'Germany', icon: 'Factory' },
      { stage: 'Distribution', description: 'Shipped via carbon-neutral logistics.', location: 'Europe', icon: 'Truck' }
    ],
    purchaseCount: 850,
    salesTrend: [
      { month: 'Jan', sales: 40 },
      { month: 'Feb', sales: 65 },
      { month: 'Mar', sales: 90 },
      { month: 'Apr', sales: 110 },
      { month: 'May', sales: 140 },
      { month: 'Jun', sales: 180 }
    ],
    pointsValue: 120,
    priceComparison: [
      { site: 'Amazon', price: 35.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 34.50, url: 'https://flipkart.com' },
      { site: 'Sephora', price: 32.00, url: 'https://sephora.com' },
      { site: 'EcoBazaar', price: 32.00, url: '#', isBestValue: true }
    ]
  },
  {
    id: '8',
    name: 'Natural Mineral Powder',
    description: 'Lightweight mineral foundation that provides flawless coverage without harsh chemicals.',
    price: 28.50,
    category: 'Cosmetics',
    image: 'https://picsum.photos/seed/powder/400/300',
    brand: 'EarthTone',
    carbonScore: 91,
    emissionLevel: EmissionLevel.LOW,
    carbonData: {
      production: 0.4,
      transport: 0.2,
      packaging: 0.1,
      usage: 0,
      total: 0.7
    },
    materials: ['Mica', 'Zinc Oxide', 'Bamboo Case'],
    manufactureDate: '2024-06-01',
    expectedLifespan: '3 years',
    repairabilityScore: 5,
    recyclingInstructions: 'Bamboo case is compostable. Metal pan is recyclable.',
    lifecycleStages: [
      { stage: 'Mining', description: 'Ethically sourced mica from verified mines.', location: 'India', icon: 'ShieldCheck' },
      { stage: 'Milling', description: 'Ultra-fine milling process using renewable energy.', location: 'USA', icon: 'Factory' }
    ],
    purchaseCount: 520,
    salesTrend: [
      { month: 'Jan', sales: 20 },
      { month: 'Feb', sales: 35 },
      { month: 'Mar', sales: 50 },
      { month: 'Apr', sales: 65 },
      { month: 'May', sales: 80 },
      { month: 'Jun', sales: 110 }
    ],
    pointsValue: 140,
    priceComparison: [
      { site: 'Amazon', price: 30.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 29.99, url: 'https://flipkart.com' },
      { site: 'Myntra', price: 28.50, url: 'https://myntra.com' },
      { site: 'EcoBazaar', price: 28.50, url: '#', isBestValue: true }
    ]
  },
  {
    id: '9',
    name: 'iPhone 15 Pro',
    description: 'Titanium design, A17 Pro chip, and the most advanced camera system on iPhone.',
    price: 1349.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800',
    brand: 'Apple',
    carbonScore: 78,
    emissionLevel: EmissionLevel.MEDIUM,
    carbonData: { production: 45, transport: 10, packaging: 5, usage: 20, total: 80 },
    materials: ['Recycled Titanium', 'Recycled Cobalt', 'Recycled Gold'],
    manufactureDate: '2023-09-15',
    expectedLifespan: '5-7 years',
    repairabilityScore: 7,
    recyclingInstructions: 'Return to Apple Trade In or any certified e-waste recycler.',
    weight: '187g',
    dimensions: '146.6 x 70.6 x 8.25 mm',
    origin: 'China',
    lifecycleStages: [
      { stage: 'Material Recovery', description: '75% of materials recovered from previous devices.', location: 'Global', icon: 'BarChart3' },
      { stage: 'Assembly', description: 'Assembled in zero-waste-to-landfill facilities.', location: 'China', icon: 'Factory' },
      { stage: 'Usage', description: 'Energy-efficient operation over product life.', location: 'User', icon: 'Zap' }
    ],
    purchaseCount: 15400,
    salesTrend: [
      { month: 'Jan', sales: 2100 },
      { month: 'Feb', sales: 2400 },
      { month: 'Mar', sales: 2800 },
      { month: 'Apr', sales: 3100 },
      { month: 'May', sales: 3500 },
      { month: 'Jun', sales: 4200 }
    ],
    pointsValue: 50,
    priceComparison: [
      { site: 'Amazon', price: 1399.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 1379.00, url: 'https://flipkart.com' },
      { site: 'Apple Store', price: 1349.00, url: 'https://apple.com' },
      { site: 'EcoBazaar', price: 1349.00, url: '#', isBestValue: true }
    ]
  },
  {
    id: '10',
    name: 'MacBook Air M3',
    description: 'Liquid Retina display, silent design, and incredible battery life in a thin, light enclosure.',
    price: 1149.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714460-d1b164964716?w=800',
    brand: 'Apple',
    carbonScore: 85,
    emissionLevel: EmissionLevel.MEDIUM,
    carbonData: { production: 60, transport: 15, packaging: 5, usage: 30, total: 110 },
    materials: ['100% Recycled Aluminum', 'Recycled Rare Earth Elements'],
    manufactureDate: '2024-03-04',
    expectedLifespan: '6-8 years',
    repairabilityScore: 6,
    recyclingInstructions: 'Aluminum enclosure is infinitely recyclable. Battery requires specialized handling.',
    lifecycleStages: [
      { stage: 'Aluminum Smelting', description: 'Low-carbon aluminum smelting using hydro power.', location: 'Canada', icon: 'Zap' },
      { stage: 'Final Assembly', description: 'Carbon-neutral final assembly sites.', location: 'China', icon: 'Factory' }
    ],
    purchaseCount: 9800,
    salesTrend: [
      { month: 'Jan', sales: 1200 },
      { month: 'Feb', sales: 1400 },
      { month: 'Mar', sales: 1600 },
      { month: 'Apr', sales: 1800 },
      { month: 'May', sales: 2100 },
      { month: 'Jun', sales: 2500 }
    ],
    pointsValue: 80,
    priceComparison: [
      { site: 'Amazon', price: 1199.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 1179.00, url: 'https://flipkart.com' },
      { site: 'Apple Store', price: 1149.00, url: 'https://apple.com' },
      { site: 'EcoBazaar', price: 1149.00, url: '#', isBestValue: true }
    ]
  },
  {
    id: '11',
    name: 'Sony XM5 Headphones',
    description: 'Industry-leading noise cancellation and premium sound quality for an immersive experience.',
    price: 299.90,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    brand: 'Sony',
    carbonScore: 82,
    emissionLevel: EmissionLevel.MEDIUM,
    carbonData: { production: 12, transport: 4, packaging: 2, usage: 5, total: 23 },
    materials: ['Recycled Plastic', 'Eco-Friendly Packaging'],
    manufactureDate: '2024-01-20',
    expectedLifespan: '4-6 years',
    repairabilityScore: 4,
    recyclingInstructions: 'Plastic components are recyclable. E-waste collection recommended for electronics.',
    lifecycleStages: [
      { stage: 'Plastic Recycling', description: 'Post-consumer recycled plastics processed.', location: 'Japan', icon: 'Package' },
      { stage: 'Acoustic Tuning', description: 'Precision engineering for longevity.', location: 'Malaysia', icon: 'Factory' }
    ],
    purchaseCount: 3200,
    salesTrend: [
      { month: 'Jan', sales: 300 },
      { month: 'Feb', sales: 450 },
      { month: 'Mar', sales: 600 },
      { month: 'Apr', sales: 750 },
      { month: 'May', sales: 900 },
      { month: 'Jun', sales: 1100 }
    ],
    pointsValue: 70,
    priceComparison: [
      { site: 'Amazon', price: 349.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 329.00, url: 'https://flipkart.com' },
      { site: 'Croma', price: 319.00, url: 'https://croma.com' },
      { site: 'EcoBazaar', price: 299.90, url: '#', isBestValue: true }
    ]
  },
  {
    id: '12',
    name: 'Silk Banarasi Saree',
    description: 'Pure silk with intricate gold zari work, handcrafted by traditional artisans.',
    price: 540.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
    brand: 'HeritageWeave',
    carbonScore: 95,
    emissionLevel: EmissionLevel.LOW,
    carbonData: { production: 2, transport: 1, packaging: 0.5, usage: 0, total: 3.5 },
    materials: ['Pure Silk', 'Natural Dyes'],
    manufactureDate: '2023-11-30',
    expectedLifespan: '50+ years (Heirloom quality)',
    repairabilityScore: 9,
    recyclingInstructions: 'Natural silk is biodegradable. Can be repurposed into other garments.',
    lifecycleStages: [
      { stage: 'Sericulture', description: 'Organic silk farming without pesticides.', location: 'Varanasi, India', icon: 'Leaf' },
      { stage: 'Hand-weaving', description: 'Traditional handloom weaving (Zero electricity).', location: 'Varanasi, India', icon: 'Factory' }
    ],
    purchaseCount: 450,
    salesTrend: [
      { month: 'Jan', sales: 20 },
      { month: 'Feb', sales: 45 },
      { month: 'Mar', sales: 70 },
      { month: 'Apr', sales: 95 },
      { month: 'May', sales: 120 },
      { month: 'Jun', sales: 150 }
    ],
    pointsValue: 200,
    priceComparison: [
      { site: 'Amazon', price: 600.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 580.00, url: 'https://flipkart.com' },
      { site: 'FabIndia', price: 550.00, url: 'https://fabindia.com' },
      { site: 'EcoBazaar', price: 540.00, url: '#', isBestValue: true }
    ]
  },
  {
    id: '13',
    name: 'Minimalist Ceramic Vase',
    description: 'Handcrafted ceramic vase with a matte finish, perfect for modern home decor.',
    price: 45.00,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800',
    brand: 'EarthForm',
    carbonScore: 98,
    emissionLevel: EmissionLevel.LOW,
    carbonData: { production: 0.5, transport: 0.2, packaging: 0.1, usage: 0, total: 0.8 },
    materials: ['Natural Clay', 'Lead-Free Glaze'],
    manufactureDate: '2024-02-14',
    expectedLifespan: 'Indefinite',
    repairabilityScore: 8,
    recyclingInstructions: 'Ceramic can be crushed for use in construction or landscaping.',
    lifecycleStages: [
      { stage: 'Clay Extraction', description: 'Local clay sourced to minimize transport.', location: 'Portugal', icon: 'Truck' },
      { stage: 'Kiln Firing', description: 'Fired in high-efficiency electric kilns.', location: 'Portugal', icon: 'Zap' }
    ],
    purchaseCount: 2100,
    salesTrend: [
      { month: 'Jan', sales: 150 },
      { month: 'Feb', sales: 250 },
      { month: 'Mar', sales: 350 },
      { month: 'Apr', sales: 450 },
      { month: 'May', sales: 550 },
      { month: 'Jun', sales: 700 }
    ],
    pointsValue: 250,
    priceComparison: [
      { site: 'Amazon', price: 55.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 52.00, url: 'https://flipkart.com' },
      { site: 'West Elm', price: 48.00, url: 'https://westelm.com' },
      { site: 'EcoBazaar', price: 45.00, url: '#', isBestValue: true }
    ]
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, breathable t-shirt made from GOTS certified organic cotton.',
    price: 24.99,
    category: 'Apparel',
    image: 'https://picsum.photos/seed/tshirt/400/300',
    brand: 'PureThreads',
    carbonScore: 85,
    emissionLevel: EmissionLevel.MEDIUM,
    carbonData: {
      production: 2.5,
      transport: 0.8,
      packaging: 0.2,
      usage: 1.5,
      total: 5.0
    },
    materials: ['100% GOTS Organic Cotton', 'Natural Dyes'],
    manufactureDate: '2024-04-05',
    expectedLifespan: '3-5 years',
    repairabilityScore: 9,
    recyclingInstructions: '100% biodegradable. Can be composted or recycled as textile waste.',
    lifecycleStages: [
      { stage: 'Cotton Farming', description: 'Rain-fed organic cotton cultivation.', location: 'Turkey', icon: 'Leaf' },
      { stage: 'Garment Dyeing', description: 'Closed-loop dyeing system to save water.', location: 'Turkey', icon: 'Factory' }
    ],
    purchaseCount: 4200,
    salesTrend: [
      { month: 'Jan', sales: 400 },
      { month: 'Feb', sales: 550 },
      { month: 'Mar', sales: 700 },
      { month: 'Apr', sales: 850 },
      { month: 'May', sales: 1000 },
      { month: 'Jun', sales: 1200 }
    ],
    pointsValue: 100,
    priceComparison: [
      { site: 'Amazon', price: 29.99, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 27.50, url: 'https://flipkart.com' },
      { site: 'H&M', price: 25.00, url: 'https://hm.com' },
      { site: 'EcoBazaar', price: 24.99, url: '#', isBestValue: true }
    ]
  },
  {
    id: '3',
    name: 'Solar Powered Power Bank',
    description: 'Charge your devices on the go using the power of the sun.',
    price: 45.00,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/solar/400/300',
    brand: 'SunCharge',
    carbonScore: 78,
    emissionLevel: EmissionLevel.MEDIUM,
    carbonData: {
      production: 8.0,
      transport: 1.2,
      packaging: 0.5,
      usage: -5.0,
      total: 4.7
    },
    materials: ['Recycled Plastic', 'Monocrystalline Silicon', 'Lithium Polymer'],
    manufactureDate: '2023-12-10',
    expectedLifespan: '4 years',
    repairabilityScore: 3,
    recyclingInstructions: 'Contains lithium battery. Must be taken to specialized battery recycling.',
    lifecycleStages: [
      { stage: 'Silicon Processing', description: 'High-purity silicon refined for solar cells.', location: 'China', icon: 'Zap' },
      { stage: 'Battery Integration', description: 'Safe assembly of high-capacity cells.', location: 'Vietnam', icon: 'Factory' }
    ],
    purchaseCount: 1800,
    salesTrend: [
      { month: 'Jan', sales: 100 },
      { month: 'Feb', sales: 200 },
      { month: 'Mar', sales: 300 },
      { month: 'Apr', sales: 400 },
      { month: 'May', sales: 500 },
      { month: 'Jun', sales: 600 }
    ],
    pointsValue: 60,
    priceComparison: [
      { site: 'Amazon', price: 55.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 52.00, url: 'https://flipkart.com' },
      { site: 'Croma', price: 49.00, url: 'https://croma.com' },
      { site: 'EcoBazaar', price: 45.00, url: '#', isBestValue: true }
    ]
  },
  {
    id: '4',
    name: 'Recycled Glass Water Bottle',
    description: 'Durable and stylish water bottle made from 100% recycled glass.',
    price: 18.50,
    category: 'Home & Kitchen',
    image: 'https://picsum.photos/seed/bottle/400/300',
    brand: 'ClearEarth',
    carbonScore: 88,
    emissionLevel: EmissionLevel.MEDIUM,
    carbonData: {
      production: 1.2,
      transport: 0.5,
      packaging: 0.1,
      usage: 0,
      total: 1.8
    },
    materials: ['100% Recycled Glass', 'Stainless Steel Cap', 'Silicone Seal'],
    manufactureDate: '2024-05-20',
    expectedLifespan: '10+ years',
    repairabilityScore: 10,
    recyclingInstructions: 'Glass and steel are infinitely recyclable. Silicone seal is replaceable.',
    lifecycleStages: [
      { stage: 'Glass Collection', description: 'Post-consumer glass collected and sorted.', location: 'Spain', icon: 'Package' },
      { stage: 'Glass Blowing', description: 'Recycled glass melted and formed.', location: 'Spain', icon: 'Factory' }
    ],
    purchaseCount: 3500,
    salesTrend: [
      { month: 'Jan', sales: 300 },
      { month: 'Feb', sales: 450 },
      { month: 'Mar', sales: 600 },
      { month: 'Apr', sales: 750 },
      { month: 'May', sales: 900 },
      { month: 'Jun', sales: 1100 }
    ],
    pointsValue: 110,
    priceComparison: [
      { site: 'Amazon', price: 22.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 20.50, url: 'https://flipkart.com' },
      { site: 'IKEA', price: 19.00, url: 'https://ikea.com' },
      { site: 'EcoBazaar', price: 18.50, url: '#', isBestValue: true }
    ]
  },
  {
    id: '5',
    name: 'Hemp Backpack',
    description: 'Strong, durable backpack made from natural hemp fibers.',
    price: 65.00,
    category: 'Accessories',
    image: 'https://picsum.photos/seed/backpack/400/300',
    brand: 'EcoTrail',
    carbonScore: 82,
    emissionLevel: EmissionLevel.MEDIUM,
    carbonData: {
      production: 3.5,
      transport: 1.0,
      packaging: 0.3,
      usage: 0,
      total: 4.8
    },
    materials: ['Industrial Hemp Fiber', 'Recycled Polyester Lining', 'Metal Buckles'],
    manufactureDate: '2024-02-28',
    expectedLifespan: '8-10 years',
    repairabilityScore: 8,
    recyclingInstructions: 'Hemp fabric is biodegradable. Remove metal buckles before composting.',
    lifecycleStages: [
      { stage: 'Hemp Harvesting', description: 'Fast-growing hemp requires no pesticides.', location: 'Romania', icon: 'Leaf' },
      { stage: 'Weaving', description: 'Durable canvas weaving process.', location: 'Romania', icon: 'Factory' }
    ],
    purchaseCount: 1200,
    salesTrend: [
      { month: 'Jan', sales: 80 },
      { month: 'Feb', sales: 150 },
      { month: 'Mar', sales: 220 },
      { month: 'Apr', sales: 290 },
      { month: 'May', sales: 360 },
      { month: 'Jun', sales: 450 }
    ],
    pointsValue: 90,
    priceComparison: [
      { site: 'Amazon', price: 75.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 72.00, url: 'https://flipkart.com' },
      { site: 'Decathlon', price: 68.00, url: 'https://decathlon.com' },
      { site: 'EcoBazaar', price: 65.00, url: '#', isBestValue: true }
    ]
  },
  {
    id: '6',
    name: 'Biodegradable Phone Case',
    description: 'Protect your phone and the planet with this compostable case.',
    price: 29.99,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/phonecase/400/300',
    brand: 'TerraCase',
    carbonScore: 95,
    emissionLevel: EmissionLevel.LOW,
    carbonData: {
      production: 0.5,
      transport: 0.2,
      packaging: 0.1,
      usage: 0,
      total: 0.8
    },
    materials: ['Plant-based Biopolymer', 'Flax Shive'],
    manufactureDate: '2024-06-15',
    expectedLifespan: '2 years',
    repairabilityScore: 1,
    recyclingInstructions: '100% home compostable. Will break down in 6-12 months.',
    lifecycleStages: [
      { stage: 'Biopolymer Synthesis', description: 'Derived from corn starch and flax waste.', location: 'Canada', icon: 'Leaf' },
      { stage: 'Molding', description: 'Injection molding with minimal waste.', location: 'Canada', icon: 'Factory' }
    ],
    purchaseCount: 5600,
    salesTrend: [
      { month: 'Jan', sales: 600 },
      { month: 'Feb', sales: 850 },
      { month: 'Mar', sales: 1100 },
      { month: 'Apr', sales: 1350 },
      { month: 'May', sales: 1600 },
      { month: 'Jun', sales: 1900 }
    ],
    pointsValue: 180,
    priceComparison: [
      { site: 'Amazon', price: 35.00, url: 'https://amazon.com' },
      { site: 'Flipkart', price: 32.50, url: 'https://flipkart.com' },
      { site: 'Croma', price: 31.00, url: 'https://croma.com' },
      { site: 'EcoBazaar', price: 29.99, url: '#', isBestValue: true }
    ]
  }
];

const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_DB_KEY);
  if (!stored || stored === '[]') {
    localStorage.setItem(PRODUCTS_DB_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    const parsed = JSON.parse(stored);
    // Check if data is stale (missing new fields from Digital Product Passport, Market Data, Green Points, Emission Level, or Price Comparison)
    if (parsed.length > 0 && (!parsed[0].lifecycleStages || !parsed[0].purchaseCount || !parsed[0].pointsValue || !parsed[0].emissionLevel || !parsed[0].priceComparison)) {
      console.log('Stale product data detected, resetting to initial products');
      localStorage.setItem(PRODUCTS_DB_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return parsed;
  } catch (e) {
    localStorage.setItem(PRODUCTS_DB_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getStoredProducts()), 500);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getStoredProducts().find(p => p.id === id)), 300);
  });
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = getStoredProducts();
      const newProduct = {
        ...product,
        id: Math.random().toString(36).substr(2, 9)
      };
      products.push(newProduct);
      localStorage.setItem(PRODUCTS_DB_KEY, JSON.stringify(products));
      resolve(newProduct);
    }, 800);
  });
};
