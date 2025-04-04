const mongoose = require('mongoose');

const File = require('../models/File');  // Corrected path ✅


const fileSchema = new mongoose.Schema({
  filename: String,
  xmlPath: String,
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('File', fileSchema);
