const fs = require('fs');
const path = require('path');

// List of image filenames from the seeder.js file
const imageFilenames = [
  'biodegradable-boxes.jpg',
  'compostable-mailers.jpg',
  'silicone-wraps.jpg',
  'paper-bubble-wrap.jpg',
  'bamboo-utensils.jpg',
  'mushroom-packaging.jpg',
  'seaweed-film.jpg',
  'paper-tape.jpg',
  'glass-containers.jpg',
  'cornstarch-peanuts.jpg',
  'beeswax-wraps.jpg',
  'sugarcane-containers.jpg',
  'produce-bags.jpg',
  'wheat-straw-lunchbox.jpg',
  'cork-inserts.jpg',
  'bamboo-toothbrushes.jpg',
  'cardboard-mailers.jpg',
  'coconut-coir.jpg',
  'steel-straws.jpg',
  'seed-paper.jpg'
];

// Directory path
const uploadsDir = path.join(__dirname, 'uploads/products');

// Create placeholder files
imageFilenames.forEach(filename => {
  const filePath = path.join(uploadsDir, filename);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`File ${filename} already exists, skipping...`);
    return;
  }
  
  // Create placeholder content
  const content = `This is a placeholder for a ${filename.replace('.jpg', '')} image.`;
  
  // Write file
  fs.writeFileSync(filePath, content);
  console.log(`Created placeholder for ${filename}`);
});

console.log('All placeholder images created successfully!');
