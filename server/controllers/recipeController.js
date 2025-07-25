import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

// @desc    Create a recipe
// @route   POST /api/recipes
export const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      createdBy: req.user._id
    });
    
    const createdRecipe = await recipe.save();
    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Check ownership or admin
    if (recipe.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    Object.assign(recipe, req.body);
    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Check ownership or admin
    if (recipe.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe removed' });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all recipes with filters
// @route   GET /api/recipes
export const getRecipes = async (req, res) => {
  try {
    const { search, tags, difficulty, time } = req.query;
    const query = {};
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (time) {
      query.totalTime = { $lte: parseInt(time) };
    }
    
    const recipes = await Recipe.find(query).populate('createdBy', 'name');
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get recipe by ID
// @route   GET /api/recipes/:id
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('comments.user', 'name');
      
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Toggle favorite recipe
// @route   POST /api/recipes/:id/favorite
export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recipeId = req.params.id;
    
    const index = user.favorites.indexOf(recipeId);
    if (index === -1) {
      user.favorites.push(recipeId);
    } else {
      user.favorites.splice(index, 1);
    }
    
    await user.save();
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add comment to recipe
// @route   POST /api/recipes/:id/comments
export const addComment = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    const comment = {
      user: req.user._id,
      text: req.body.text
    };
    
    recipe.comments.push(comment);
    await recipe.save();
    
    res.status(201).json(recipe.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
