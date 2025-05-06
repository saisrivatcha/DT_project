const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/qrcodes');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Generate QR code for product disposal information
 * @param {string} productId - Product ID
 * @param {string} disposalInfo - Disposal information to encode
 * @returns {Promise<string>} - URL to the generated QR code
 */
const generateQRCode = async (productId, disposalInfo) => {
  try {
    const filename = `${productId}_qrcode.png`;
    const filePath = path.join(uploadsDir, filename);
    
    // Generate QR code
    await QRCode.toFile(filePath, disposalInfo, {
      color: {
        dark: '#00796b',  // Green color for QR code
        light: '#ffffff'  // White background
      },
      width: 300,
      margin: 1
    });
    
    // Return the relative URL to the QR code
    return `/uploads/qrcodes/${filename}`;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

module.exports = generateQRCode;
