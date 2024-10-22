const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Маршрут для регистрации
router.post('/register', userController.registerUser);

// Маршрут для входа
router.post('/login', userController.loginUser);

// Получение пользователя по ID
router.get('/:id', userController.getUserById);

module.exports = router;