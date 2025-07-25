const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('../models/User');

const MONGO_URI = 'mongodb+srv://adithyamp:Fnz5vX0BqEtLaW3t@chefai-cluster.vaexjfs.mongodb.net/chefaiDB?retryWrites=true&w=majority';
const JWT_SECRET = 'your_strong_secret_here_change_this'; // Replace with your actual secret

async function generateToken() {
  try {
    await mongoose.connect(MONGO_URI);
    const User = mongoose.model('User');
    const user = await User.findOne();
    if (!user) {
      console.log('No user found');
      process.exit(1);
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated JWT token:', token);
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

generateToken();
