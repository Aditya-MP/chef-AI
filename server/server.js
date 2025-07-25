// Use ES module import for connectDB
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db').default;

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));
app.use(express.json());

// Database Connection
connectDB();

// Models
const User = require('./models/User');
const Recipe = require('./models/Recipe');

// Auth Middleware
const authenticate = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Routes

// 1. User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create and save user
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Recipe Generation
app.post('/api/recipes/generate', authenticate, async (req, res) => {
  try {
    const { ingredients, dietaryFilters } = req.body;

    // Validate input
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Ingredients array required' });
    }

    // Find matching recipes (simplified - replace with AI logic)
    const recipes = await Recipe.find({
      ingredients: { $in: ingredients.map(i => new RegExp(i, 'i')) },
      ...(dietaryFilters && { dietaryTags: { $in: dietaryFilters } })
    }).limit(5);

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Error Handling
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});