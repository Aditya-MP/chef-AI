const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

const MONGO_URI = 'mongodb+srv://adithyamp:Fnz5vX0BqEtLaW3t@chefai-cluster.vaexjfs.mongodb.net/chefaiDB?retryWrites=true&w=majority';

const sampleRecipes = [
  {
    title: "Veggie Stir Fry",
    ingredients: ["bell pepper", "broccoli", "soy sauce"],
    instructions: "Stir-fry vegetables in a wok with soy sauce.",
    dietaryTags: ["vegetarian", "vegan"],
    cookTime: 15
  }
];

async function insertSampleRecipes() {
  try {
    await mongoose.connect(MONGO_URI);
    await Recipe.insertMany(sampleRecipes);
    console.log('Sample recipes inserted successfully');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error inserting sample recipes:', err);
  }
}

insertSampleRecipes();
