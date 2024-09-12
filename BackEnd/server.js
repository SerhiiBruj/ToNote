const { APIKEY } = require("./keys.js");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 3000;
const multer = require("multer");
const path = require("path");
const validator = require("validator");
const fs = require("fs");
app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Не вдалося підключитися до бази даних:", err);
  } else {
    console.log("Підключено до бази даних SQLite.");
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT
    )`);
  }
});

// Налаштування для зберігання файлів на диску
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profile-image"); // Директорія, куди будуть зберігатися файли
  },
  filename: async (req, file, cb) => {
    let dname = await decodedToken(req);
    cb(null, dname.username +'.png'); // Ім'я файлу
  },
});

// Ініціалізація Multer з параметрами storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Ліміт 5 MB
  fileFilter: (req, file, cb) => {
    // Фільтр для дозволених типів файлів
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true); // Дозволити файл
    } else {
      cb(new Error("Тільки зображення (JPEG, JPG, PNG) дозволено!")); // Відмовити у завантаженні
    }
  },
});

// Директорія для завантажених файлів
const uploadDir = "./profile-image";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Створення директорії, якщо вона не існує
}
const testToken = async (req) => {
  try {
    const decoded = await decodedToken(req);
    console.log("Decoded Token:", decoded);
  } catch (err) {
    console.error("Token Error:", err);
  }
};

// Маршрут для завантаження файлів
app.post("/upload", upload.single("avatar"), (req, res) => {
  try {
    console.log(req.file); // Виводимо інформацію про файл у консоль
    res.status(200).json({
      message: "Зображення успішно завантажено",
      file: req.file, // Відправляємо інформацію про завантажений файл
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Помилка завантаження файлу");
  }
});

// Виведення статичних файлів
app.use("/profile-image", express.static("profile-image"));

// Статичний доступ до завантажених файлів

// db.run(`ALTER TABLE users ADD COLUMN avatar TEXT DEFAULT '' `, (err) => {
//   if (err) {
//     console.error("Помилка при додаванні нового стовпця:", err);
//   } else {
//     console.log("Новий стовпець 'age' додано до таблиці 'users'.");
//   }
// });

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email }, // дані користувача
    APIKEY, // секретний ключ
    { expiresIn: "48h" } // час дії токена
  );
};

app.get("/authentification", async (req, res) => {
  try {
    const decoded = await decodedToken(req);
    const imagePath = path.join(
      __dirname,
      "profile-image",
      `${decoded.username}.png`
    );
     
      return res.json({
        message: `Вітаємо, ${decoded.username}! Це ваш профіль.`,
        decoded,
        imageUrl: (fs.existsSync(imagePath)) ?`http://localhost:3000/profile-image/${decoded.username}.png`:null, // URL для отримання зображення
      });
    
  } catch (error) {
    return res.status(401).json({ message: error });
  }
});
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log(1);
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(2);

  const sql = `INSERT INTO users (username, email, password) VALUES (?,?, ?)`;
  console.log(3);
  db.run(sql, [username, email, hashedPassword], function (err) {
    console.log(4);
    if (err) {
      return res
        .status(500)
        .json({ message: "Помилка при реєстрації користувача." });
    }
    const user = { id: this.lastID, username, email };
    const token = generateToken(user);
    res.json({ message: "Користувача зареєстровано!", token, username, email });
  });
});

app.get("/users", (req, res) => {
  const sql = `SELECT * FROM users`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Помилка при отриманні користувачів." });
    }
    res.json(rows);
  });
});

// Вхід користувача
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Функція для перевірки, чи є це email

  // Формування SQL запиту залежно від того, що введено: email чи нікнейм
  const sql = validator.isEmail(username)
    ? `SELECT * FROM users WHERE email = ?`
    : `SELECT * FROM users WHERE username = ?`;

  db.get(sql, [username], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "Невірний логін або пароль." });
    }

    // Перевірка паролю
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Невірний логін або пароль." });
    }

    // Генерація JWT токену
    const token = generateToken(user);
    res.json({
      message: "Вхід успішний!",
      token,
      username: user.username,
      email: user.email,
    });
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});
const decodedToken = (req) => {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return reject("Токен не надано.");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return reject("Токен не надано.");
    }

    jwt.verify(token, APIKEY, (err, decoded) => {
      if (err) {
        console.log("JWT Error:", err); // Логування помилки
        return reject("Невірний токен.");
      }

      // Повертаємо розшифрований токен
      resolve(decoded);
    });
  });
};

// app.get('/test', (req, res) => {
//   db.run("UPDATE users SET email = ? WHERE username = ?", ['sergijk174@gmail.com', 'Serhijko'], function(err) {
//     if (err) {
//       // Виводимо помилку, якщо вона є
//       return res.status(500).send(`Помилка: ${err.message}`);
//     }
//   });
//   db.all(`SELECT * FROM users`, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.send(rows);
//   });
// });
