const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const path = require('path');

const router = express.Router();

// Set up file storage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Upload PDF file
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = new File({
            filename: req.file.filename,
            xmlPath: path.join('uploads/', req.file.filename.replace('.pdf', '.xml')),
        });
        await file.save();
        res.json({ message: 'File uploaded successfully', file });
    } catch (err) {
        res.status(500).json({ error: 'Error uploading file' });
    }
});

// Get uploaded files
router.get('/files', async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching files' });
    }
});

module.exports = router;
