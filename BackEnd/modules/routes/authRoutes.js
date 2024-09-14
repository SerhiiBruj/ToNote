const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/controllers');
const { validateRegister, validateLogin } = require('../utils/validators');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;
