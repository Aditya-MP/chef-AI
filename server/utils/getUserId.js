const mongoose = require('mongoose');
require('../models/User');

async function getUserId() {
  try {
    await mongoose.connect('mongodb+srv://adithyamp:Fnz5vX0BqEtLaW3t@chefai-cluster.vaexjfs.mongodb.net/chefaiDB?retryWrites=true&w=majority');
    const User = mongoose.model('User');
    const user = await User.findOne();
    if (user) {
      console.log(user._id.toString());
    } else {
      console.log('No user found');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

getUserId();
