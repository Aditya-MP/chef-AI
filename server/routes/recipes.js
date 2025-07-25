const express = require('express');
const jwt = require('jsonwebtoken');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Middleware: Verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token, access denied' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Generate recipes based on ingredients (AI logic placeholder)
router.post('/', auth, async (req, res) => {
  const { ingredients, dietaryFilters } = req.body;
  
  // Simulate AI-generated recipes (replace with actual AI integration later)
  const mockRecipes = [
    {
      title: "Vegetable Stir Fry",
      ingredients: ["bell pepper", "broccoli", "soy sauce"],
      instructions: "Stir-fry vegetables on high heat for 5 minutes...",
      dietaryTags: ["vegetarian", "vegan"]
    }
  ];

  res.json(mockRecipes);
});

module.exports = router;