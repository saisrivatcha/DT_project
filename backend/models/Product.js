const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Please provide a product image']
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    enum: ['Biodegradable', 'Reusable', 'Compostable', 'Other']
  },
  material: {
    type: String,
    required: [true, 'Please provide the material information']
  },
  ecoScore: {
    type: Number,
    required: [true, 'Please provide an eco-score'],
    min: 1,
    max: 10
  },
  disposalInfo: {
    type: String,
    required: [true, 'Please provide disposal instructions']
  },
  qrCodeURL: {
    type: String
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0,
    default: 0
  },
  certifications: [{
    name: String,
    issuer: String,
    validUntil: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
