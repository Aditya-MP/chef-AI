const mongoose = require('mongoose');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://adithyamp:Fnz5vX0BqEtLaW3t@chefai-cluster.vaexjfs.mongodb.net/chefaiDB?retryWrites=true&w=majority';

async function checkUserPassword(email) {
  try {
    await mongoose.connect(MONGO_URI);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
    } else {
      console.log('User password field:', user.password);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

checkUserPassword('test@example.com');
