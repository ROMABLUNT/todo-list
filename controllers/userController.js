const db = require('../db'); // Наш модуль для подключения к базе данных
const bcrypt = require('bcryptjs');

// Регистрация пользователя
exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // Проверяем, заполнены ли поля
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Хешируем пароль
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // SQL-запрос для вставки нового пользователя
    const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'User with this email already exists' });
            }
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
};

// Вход пользователя
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Проверяем, заполнены ли поля
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    // SQL-запрос для поиска пользователя по email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        // Проверка пароля
        const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful', userId: user.id });
    });
};

// Получение информации о пользователе по ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    const query = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(results[0]);
    });
};