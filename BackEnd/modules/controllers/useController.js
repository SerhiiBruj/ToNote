const { decodedToken } = require('./authController');
const { writeEntriesToDatabase } = require('../models/entryModel');

// Отримання профілю
const getProfile = async (req, res) => {
  try {
    const decoded = await decodedToken(req);
    if (!decoded) throw new Error('Invalid Token');

    const imagePath = path.join(__dirname, '..', 'profile-image', `${decoded.username}.png`);
    return res.json({
      message: `Вітаємо, ${decoded.username}! Це ваш профіль.`,
      decoded,
      imageUrl: fs.existsSync(imagePath) ? `http://localhost:3000/profile-image/${decoded.username}.png` : null
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { getProfile };
