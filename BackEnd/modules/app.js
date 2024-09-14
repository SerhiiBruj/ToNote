const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Налаштування
app.use(bodyParser.json());
app.use(cors());

// Multer для завантаження файлів
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profile-image');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.username}.png`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Тільки зображення (JPEG, JPG, PNG) дозволено!'));
  },
});
const uploadDir = './profile-image';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Роутери
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.post('/upload', upload.single('avatar'), (req, res) => {
  res.status(200).json({ message: 'Зображення успішно завантажено', file: req.file });
});
app.use('/profile-image', express.static('profile-image'));

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});
