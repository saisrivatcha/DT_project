const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Sample products data
const products = [
  {
    name: 'Biodegradable Shipping Boxes',
    description: 'Eco-friendly shipping boxes made from 100% recycled cardboard. These boxes break down naturally and are perfect for e-commerce businesses looking to reduce their environmental footprint.',
    price: 1299,
    image: '/uploads/products/Biodegradable Shipping Boxes.jpg',
    category: 'Biodegradable',
    material: 'Recycled Cardboard',
    ecoScore: 9,
    disposalInfo: 'Fully recyclable. Can be composted in commercial composting facilities.',
    stock: 150,
    certifications: [
      {
        name: 'FSC Certified',
        issuer: 'Forest Stewardship Council',
        validUntil: new Date('2026-12-31')
      }
    ]
  },
  {
    name: 'Compostable Mailer Bags',
    description: 'These mailer bags are made from plant-based materials and break down completely in home compost within 180 days, leaving no microplastics behind.',
    price: 849,
    image: '/uploads/products/Compostable Mailer Bags.jpg',
    category: 'Compostable',
    material: 'Plant-based Bioplastic',
    ecoScore: 10,
    disposalInfo: 'Home compostable. Place in your compost bin or garden.',
    stock: 200,
    certifications: [
      {
        name: 'TÜV AUSTRIA OK Compost HOME',
        issuer: 'TÜV AUSTRIA',
        validUntil: new Date('2025-10-15')
      }
    ]
  },
  {
    name: 'Reusable Silicone Food Wraps',
    description: 'Replace single-use plastic wrap with these durable silicone food wraps. They create an airtight seal and can be used hundreds of times.',
    price: 15.99,
    image: '/uploads/products/Reusable Silicone Food Wraps.avif',
    category: 'Reusable',
    material: 'Food-grade Silicone',
    ecoScore: 8,
    disposalInfo: 'Reuse for years. At end of life, check with local recycling facilities for silicone recycling options.',
    stock: 75,
    certifications: [
      {
        name: 'FDA Approved',
        issuer: 'Food and Drug Administration',
        validUntil: new Date('2027-05-20')
      }
    ]
  },
  {
    name: 'Paper Bubble Wrap',
    description: 'Innovative paper-based alternative to plastic bubble wrap. Provides excellent protection while being fully recyclable.',
    price: 9.99,
    image: '/uploads/products/Paper Bubble Wrap.jpg',
    category: 'Biodegradable',
    material: 'Recycled Paper',
    ecoScore: 9,
    disposalInfo: 'Fully recyclable with paper recycling.',
    stock: 100,
    certifications: [
      {
        name: 'PEFC Certified',
        issuer: 'Programme for the Endorsement of Forest Certification',
        validUntil: new Date('2026-08-10')
      }
    ]
  },
  {
    name: 'Bamboo Utensil Set',
    description: 'Portable bamboo utensil set including fork, knife, spoon, and chopsticks. Perfect for takeout without the plastic waste.',
    price: 11.99,
    image: '/uploads/products/Bamboo Utensil Set.jpeg',
    category: 'Reusable',
    material: 'Organic Bamboo',
    ecoScore: 9,
    disposalInfo: 'Reusable for years. At end of life, can be composted in industrial composting facilities.',
    stock: 120,
    certifications: [
      {
        name: 'USDA Organic',
        issuer: 'United States Department of Agriculture',
        validUntil: new Date('2025-11-30')
      }
    ]
  },
  {
    name: 'Mushroom Packaging',
    description: 'Revolutionary packaging made from mycelium (mushroom roots) and agricultural waste. Provides excellent protection and is fully home compostable.',
    price: 18.99,
    image: '/uploads/products/Mushroom Packaging.webp',
    category: 'Compostable',
    material: 'Mycelium and Agricultural Waste',
    ecoScore: 10,
    disposalInfo: 'Home compostable. Breaks down in 45 days in home compost.',
    stock: 50,
    certifications: [
      {
        name: 'Cradle to Cradle Certified',
        issuer: 'Cradle to Cradle Products Innovation Institute',
        validUntil: new Date('2026-03-15')
      }
    ]
  },
  {
    name: 'Seaweed Packaging Film',
    description: 'Transparent film made from seaweed that dissolves in water. Perfect for small item packaging with zero waste.',
    price: 14.49,
    image: '/uploads/products/Seaweed Packaging Film.jpg',
    category: 'Biodegradable',
    material: 'Seaweed Extract',
    ecoScore: 10,
    disposalInfo: 'Water soluble. Can be dissolved in water or composted.',
    stock: 80,
    certifications: [
      {
        name: 'European Bioplastics Certified',
        issuer: 'European Bioplastics',
        validUntil: new Date('2025-09-22')
      }
    ]
  },
  {
    name: 'Recycled Paper Tape',
    description: 'Water-activated paper tape made from 100% recycled materials. Strong adhesive properties without the plastic waste of traditional packaging tape.',
    price: 6.99,
    image: '/uploads/products/Recycled Paper Tape.avif',
    category: 'Biodegradable',
    material: 'Recycled Paper with Natural Adhesive',
    ecoScore: 8,
    disposalInfo: 'Recyclable with paper. No need to remove from cardboard boxes before recycling.',
    stock: 200,
    certifications: [
      {
        name: 'Green Seal Certified',
        issuer: 'Green Seal',
        validUntil: new Date('2026-01-18')
      }
    ]
  },
  {
    name: 'Glass Food Containers Set',
    description: 'Set of 5 glass food containers with bamboo lids. Perfect for food storage without plastic.',
    price: 29.99,
    image: '/uploads/products/Glass Food Containers Set.jpg',
    category: 'Reusable',
    material: 'Borosilicate Glass and Bamboo',
    ecoScore: 8,
    disposalInfo: 'Glass is infinitely recyclable. Bamboo lids can be composted at industrial facilities.',
    stock: 60,
    certifications: [
      {
        name: 'FDA Approved',
        issuer: 'Food and Drug Administration',
        validUntil: new Date('2027-07-14')
      }
    ]
  },
  {
    name: 'Cornstarch Packing Peanuts',
    description: 'Biodegradable alternative to styrofoam packing peanuts. Made from cornstarch, these dissolve in water and leave no toxic residue.',
    price: 7.99,
    image: '/uploads/products/Cornstarch Packing Peanuts.webp',
    category: 'Biodegradable',
    material: 'Non-GMO Cornstarch',
    ecoScore: 9,
    disposalInfo: 'Dissolve in water or compost. Safe for soil.',
    stock: 150,
    certifications: [
      {
        name: 'Non-GMO Project Verified',
        issuer: 'Non-GMO Project',
        validUntil: new Date('2025-12-05')
      }
    ]
  },
  {
    name: 'Beeswax Food Wraps',
    description: 'Reusable food wraps made from organic cotton infused with beeswax, jojoba oil, and tree resin. Natural alternative to plastic wrap.',
    price: 16.99,
    image: '/uploads/products/Beeswax Food Wraps.jpg',
    category: 'Reusable',
    material: 'Organic Cotton, Beeswax, Jojoba Oil, Tree Resin',
    ecoScore: 9,
    disposalInfo: 'Reusable for up to a year. At end of life, cut into strips and add to compost.',
    stock: 90,
    certifications: [
      {
        name: 'GOTS Certified',
        issuer: 'Global Organic Textile Standard',
        validUntil: new Date('2026-04-30')
      }
    ]
  },
  {
    name: 'Sugarcane Takeout Containers',
    description: 'Takeout containers made from sugarcane bagasse, a byproduct of sugar production. Sturdy, microwave-safe, and fully compostable.',
    price: 10.49,
    image: '/uploads/products/Sugarcane Takeout Containers.webp',
    category: 'Compostable',
    material: 'Sugarcane Bagasse',
    ecoScore: 8,
    disposalInfo: 'Commercially compostable. Breaks down in 60-90 days in industrial composting facilities.',
    stock: 120,
    certifications: [
      {
        name: 'BPI Certified',
        issuer: 'Biodegradable Products Institute',
        validUntil: new Date('2025-08-25')
      }
    ]
  },
  {
    name: 'Reusable Produce Bags',
    description: 'Set of 8 mesh produce bags made from recycled PET bottles. Washable and durable alternative to single-use plastic produce bags.',
    price: 12.99,
    image: '/uploads/products/Reusable Produce Bags.jpg',
    category: 'Reusable',
    material: 'Recycled PET',
    ecoScore: 7,
    disposalInfo: 'Reusable for years. At end of life, check with local recycling facilities for textile recycling options.',
    stock: 100,
    certifications: [
      {
        name: 'GRS Certified',
        issuer: 'Global Recycled Standard',
        validUntil: new Date('2026-02-28')
      }
    ]
  },
  {
    name: 'Wheat Straw Lunch Box',
    description: 'Eco-friendly lunch box made from wheat straw fiber. Microwave-safe, dishwasher-safe, and biodegradable at end of life.',
    price: 13.99,
    image: '/uploads/products/Wheat Straw Lunch Box.jpg.crdownload',
    category: 'Biodegradable',
    material: 'Wheat Straw Fiber',
    ecoScore: 8,
    disposalInfo: 'Biodegradable in industrial composting facilities after years of reuse.',
    stock: 75,
    certifications: [
      {
        name: 'FDA Approved',
        issuer: 'Food and Drug Administration',
        validUntil: new Date('2027-01-10')
      }
    ]
  },
  {
    name: 'Cork Packaging Inserts',
    description: 'Protective packaging inserts made from sustainable cork. Excellent shock absorption and fully biodegradable.',
    price: 9.99,
    image: '/uploads/products/Cork Packaging Inserts.jpg',
    category: 'Biodegradable',
    material: 'Natural Cork',
    ecoScore: 9,
    disposalInfo: 'Biodegradable and compostable. Can also be reused for craft projects.',
    stock: 85,
    certifications: [
      {
        name: 'FSC Certified',
        issuer: 'Forest Stewardship Council',
        validUntil: new Date('2026-06-20')
      }
    ]
  },
  {
    name: 'Bamboo Toothbrush Set',
    description: 'Set of 4 bamboo toothbrushes with plant-based bristles. Plastic-free alternative to conventional toothbrushes.',
    price: 8.99,
    image: '/uploads/products/Bamboo Toothbrush Set.jpg',
    category: 'Biodegradable',
    material: 'Organic Bamboo, Plant-based Nylon',
    ecoScore: 8,
    disposalInfo: 'Remove bristles before composting handle. Bristles should be disposed of in regular waste.',
    stock: 150,
    certifications: [
      {
        name: 'USDA Organic',
        issuer: 'United States Department of Agriculture',
        validUntil: new Date('2025-10-15')
      }
    ]
  },
  {
    name: 'Recycled Cardboard Mailers',
    description: 'Sturdy mailers made from 100% recycled cardboard. Perfect for shipping books, documents, and flat items.',
    price: 7.49,
    image: '/uploads/products/Recycled Cardboard Mailers.jpg',
    category: 'Biodegradable',
    material: 'Recycled Cardboard',
    ecoScore: 8,
    disposalInfo: 'Fully recyclable with paper recycling.',
    stock: 200,
    certifications: [
      {
        name: 'SFI Certified',
        issuer: 'Sustainable Forestry Initiative',
        validUntil: new Date('2026-05-12')
      }
    ]
  },
  {
    name: 'Coconut Coir Packaging',
    description: 'Protective packaging material made from coconut coir (coconut husk fiber). Excellent cushioning properties and fully compostable.',
    price: 11.99,
    image: '/uploads/products/Coconut Coir Packaging.jpg',
    category: 'Compostable',
    material: 'Coconut Coir',
    ecoScore: 10,
    disposalInfo: 'Home compostable. Can also be used in garden soil as a natural amendment.',
    stock: 70,
    certifications: [
      {
        name: 'OMRI Listed',
        issuer: 'Organic Materials Review Institute',
        validUntil: new Date('2025-11-30')
      }
    ]
  },
  {
    name: 'Stainless Steel Straws Set',
    description: 'Set of 8 reusable stainless steel straws with cleaning brush and cotton carrying pouch. Includes straight and bent options.',
    price: 9.99,
    image: '/uploads/products/Stainless Steel Straws Set.jpg',
    category: 'Reusable',
    material: 'Food-grade Stainless Steel',
    ecoScore: 8,
    disposalInfo: 'Reusable for life. At end of life, recyclable with metal recycling.',
    stock: 120,
    certifications: [
      {
        name: 'FDA Approved',
        issuer: 'Food and Drug Administration',
        validUntil: new Date('2027-03-25')
      }
    ]
  },
  {
    name: 'Plantable Seed Paper Packaging',
    description: 'Innovative packaging paper embedded with wildflower seeds. After use, plant the packaging and grow flowers!',
    price: 14.99,
    image: '/uploads/products/Plantable Seed Paper Packaging.jpg',
    category: 'Biodegradable',
    material: 'Recycled Paper with Non-GMO Wildflower Seeds',
    ecoScore: 10,
    disposalInfo: 'Plant in soil, water regularly, and watch flowers grow. Alternatively, compostable.',
    stock: 60,
    certifications: [
      {
        name: 'Non-GMO Project Verified',
        issuer: 'Non-GMO Project',
        validUntil: new Date('2025-09-18')
      }
    ]
  }
];

// Admin user for testing
const adminUser = {
  name: 'Admin User',
  email: 'admin@greenpackhub.com',
  password: 'admin123',
  role: 'admin'
};

// Function to import data
const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    await User.create(adminUser);
    console.log('Admin user created');

    // Insert products
    await Product.insertMany(products);
    console.log('Products imported successfully');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    console.log('Products destroyed successfully');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Determine which function to run based on command line args
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
