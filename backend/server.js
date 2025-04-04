require('dotenv').config();  // Load .env variables
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected to Atlas'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));




const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const bodyParser = require('body-parser');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

console.log("✅ Server is up and running!");
