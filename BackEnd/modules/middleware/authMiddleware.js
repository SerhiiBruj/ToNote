const { decodedToken } = require('../controllers/authController');

const authMiddleware = async (req, res, next) => {
  try {
    const decoded = await decodedToken(req);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
