const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APIKEY } = require('../../keys');
const { getUserByEmail, createUser } = require('../models/userModel');
const { writeEntriesToDatabase } = require('../models/entryModel');

// Генерація токена
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    APIKEY,
    { expiresIn: '48h' }
  );
};

// Валідація токена
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

// Реєстрація
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await createUser(username, email, hashedPassword);
    const user = { username, email }; // Не отримуємо ID тут
    const token = generateToken(user);
    res.json({ message: 'Користувача зареєстровано!', token, username, email });
  } catch (err) {
    res.status(500).json({ message: 'Помилка при реєстрації користувача.' });
  }
};

// Вхід користувача
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByEmail(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Невірний логін або пароль.' });
    }
    const token = generateToken(user);
    res.json({ message: 'Вхід успішний!', token, username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера.' });
  }
};

module.exports = { register, login, decodedToken };
