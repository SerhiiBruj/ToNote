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
    db.run(`CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT,
      entry_date DATE NOT NULL,
      user_id INTEGER,
      client_time INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
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
    cb(null, dname.username + ".png"); // Ім'я файлу
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
const profileImage = "./profile-image";
if (!fs.existsSync(profileImage)) {
  fs.mkdirSync(profileImage); // Створення директорії, якщо вона не існує
}
const userFiles = "./user-files";
if (!fs.existsSync(userFiles)) {
  fs.mkdirSync(userFiles);
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
      file: req.file,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Помилка завантаження файлу");
  }
});

app.use(
  "/profile-image",
  // async (req, res, next) => {
  //   try {
  //     console.log("Authorization header:", req.headers.authorization); // Виведення заголовка

  //     // Витягуємо токен з заголовка
  //     const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  //     if (!token) {
  //       return res.status(401).send("Invalid Token");
  //     }

  //     const decoded = await decodedToken(token);
  //     if (!decoded) {
  //       return res.status(401).send("Invalid Token");
  //     }

  //     // Перевіряємо username у шляху
  //     const usernameInPath = req.path.split("/").pop();

  //     if (decoded.username !== usernameInPath) {
  //       return res.status(403).send("Unauthorized access");
  //     }

  //     next(); // Доступ дозволено
  //   } catch (err) {
  //     console.error("Token verification error:", err);
  //     return res.status(500).send("Server Error");
  //   }
  // },
  express.static("profile-image")
);

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email }, // дані користувача
    APIKEY,
    { expiresIn: "48h" }
  );
};

app.get("/authentification", async (req, res) => {
  console.log("object");
  try {
    const decoded = await decodedToken(req);
    if (!decoded) throw Error("Invalid Token");
    console.log(req.headers.clienttime);
    writeEntriesToDatabase(decoded, req.headers.clienttime);

    const imagePath = path.join(
      __dirname,
      "profile-image",
      `${decoded.username}.png`
    );

    return res.json({
      message: `Вітаємо, ${decoded.username}! Це ваш профіль.`,
      decoded,
      imageUrl: fs.existsSync(imagePath)
        ? `http://localhost:3000/profile-image/${decoded.username}.png`
        : null,
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

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = validator.isEmail(username)
    ? `SELECT * FROM users WHERE email = ?`
    : `SELECT * FROM users WHERE username = ?`;

  db.get(sql, [username], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "Невірний логін або пароль." });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Невірний логін або пароль." });
    }

    const token = generateToken(user);
    res.json({
      message: "Вхід успішний!",
      token,
      username: user.username,
      email: user.email,
    });
  });
});

app.get("/entries", (req, res) => {
  db.all(
    "SELECT * FROM entries WHERE username = ? ORDER BY entry_date DESC ",
    [req.headers.username],
    (err, rows) => {
      if (err) {
        console.error(
          "Помилка при отриманні даних з таблиці entries: ",
          err.message
        );
        return res.status(500).json({ message: "Помилка сервера" });
      }
      return res.json(rows);
    }
  );
});

app.post("/upload-file", async (req, res) => {
  const files = req.body.file; // отримуємо масив файлів
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // отримуємо токен з заголовка Authorization
  if (!token) {
    return res.status(400).json({ message: "Токен не надано" });
  }
  try {
    const decoded = await decodedToken(req); // декодуємо токен
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Файли не відправлено" });
    }
    if (!decoded) {
      return res.status(400).json({ message: "Токен неправильний" });
    }

    files.forEach((file) => {
      const filePath = path.join(
        __dirname,
        `user-files/${decoded.username}_${file.name.replace("/", "_")}.txt`
      );
      fs.writeFileSync(filePath, file.value);
    });

    return res.status(200).json({ message: "Файли успішно збережено!" });
  } catch (error) {
    console.error("Помилка при збереженні файлу:", error);
    return res
      .status(500)
      .json({ message: "Виникла помилка при збереженні файлу" });
  }
});

app.get("/get-uploaded-file", async (req, res) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Токен не надано" });
    }
    const decoded = await decodedToken(req);
    if (!decoded) {
      return res.status(400).json({ message: "Токен неправильний" });
    }
    console.log("username", "." + decoded.username + ".");
    const allFiles = fs.readdirSync(`./user-files`);
    const userFiles = allFiles
      .filter((file) => file.startsWith(`${decoded.username}_`)) // Фільтрація за ім'ям користувача
      .map((file) => {
        const fileContent = fs.readFileSync(`./user-files/${file}`, "utf8");
        const originalFileName = file
          .slice(0, -4) // Видаляємо ".txt"
          .split("_") // Розбиваємо за "_"
          .slice(1) // Пропускаємо першу частину (ім'я користувача)
          .join("/"); // Відновлюємо шлях через "/"
        return { value: fileContent, name: originalFileName };
      });

    return res.status(200).json({ userFiles });
  } catch (err) {
    console.error("Помилка при отриманні файлу:", err.message);
    return res
      .status(500)
      .json({ message: "Виникла помилка при отриманні файлу" });
  }
});





// Listening
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});

// Functionss
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const writeEntriesToDatabase = (decoded, ct) => {
  db.get(`SELECT * FROM users WHERE email = ?`, [decoded.email], (err, row) => {
    if (err) {
      throw new Error("Помилка при отриманні користувача: " + err.message);
    } else if (!row) {
      console.log("Користувача з таким email не знайдено:", decoded.email);
      throw new Error("Користувача з таким email не знайдено");
    } else {
      db.run(
        "INSERT INTO entries (user_id, username, email, entry_date,client_time) VALUES (?, ?, ?, ?,?)",
        [row.id, decoded.username, decoded.email, new Date(), ct],
        (err) => {
          if (err) {
            console.error(
              "Помилка вставки даних у таблицю entries: ",
              err.message
            );
          } else {
            console.log("Запис успішно додано до таблиці entries", [
              row.id,
              decoded.username,
              decoded.email,
              new Date().getTime(),
              ct,
            ]);
          }
        }
      );
    }
  });
};

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

// Створюємо нову таблицю без UNIQUE для email
// db.serialize(() => {
//   // Створюємо нову тимчасову таблицю з потрібною структурою
//   db.run(`CREATE TABLE IF NOT EXISTS entries_temp (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT,
//     email TEXT,  /* Прибираємо UNIQUE */
//     entry_date DATE NOT NULL,
//     user_id INTEGER,
//     FOREIGN KEY (user_id) REFERENCES users(id)
//   )`, (err) => {
//     if (err) {
//       console.error('Помилка при створенні нової таблиці:', err.message);
//       return;
//     }

//     // Копіюємо всі дані зі старої таблиці в нову
//     db.run(`INSERT INTO entries_temp (id, username, email, entry_date, user_id)
//             SELECT id, username, email, entry_date, user_id FROM entries`, (err) => {
//       if (err) {
//         console.error('Помилка при копіюванні даних:', err.message);
//         return;
//       }

//       // Видаляємо стару таблицю
//       db.run(`DROP TABLE IF EXISTS entries`, (err) => {
//         if (err) {
//           console.error('Помилка при видаленні старої таблиці:', err.message);
//           return;
//         }

//         // Перейменовуємо нову таблицю на ім'я старої
//         db.run(`ALTER TABLE entries_temp RENAME TO entries`, (err) => {
//           if (err) {
//             console.error('Помилка при перейменуванні таблиці:', err.message);
//             return;
//           }

//           console.log('Таблиця entries успішно оновлена.');
//         });
//       });
//     });
//   });
// });
