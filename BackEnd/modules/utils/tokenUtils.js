const jwt = require('jsonwebtoken');
const { APIKEY } = require('../config/keys');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    APIKEY,
    { expiresIn: '48h' }
  );
};

const decodedToken = (req) => {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return reject('Токен не надано.');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return reject('Токен не надано.');
    }
    jwt.verify(token, APIKEY, (err, decoded) => {
      if (err) {
        return reject('Невірний токен.');
      }
      resolve(decoded);
    });
  });
};

module.exports = { generateToken, decodedToken };
