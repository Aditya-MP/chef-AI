const jwt = require('jsonwebtoken');

const userId = process.argv[2];
if (!userId) {
  console.error('Usage: node generateToken.js <userId>');
  process.exit(1);
}

const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log(token);
