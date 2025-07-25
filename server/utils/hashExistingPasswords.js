const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://adithyamp:Fnz5vX0BqEtLaW3t@chefai-cluster.vaexjfs.mongodb.net/chefaiDB?retryWrites=true&w=majority';

async function hashExistingPasswords() {
  try {
    await mongoose.connect(MONGO_URI);
    const users = await User.find({});
    for (const user of users) {
      // Check if password is already hashed (bcrypt hashes start with $2)
      if (!user.password.startsWith('$2')) {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        console.log(`Hashed password for user: ${user.email}`);
      } else {
        console.log(`Password already hashed for user: ${user.email}`);
      }
    }
    await mongoose.disconnect();
    console.log('Password hashing migration completed.');
  } catch (err) {
    console.error('Error hashing passwords:', err);
  }
}

hashExistingPasswords();
