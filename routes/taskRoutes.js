const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Получение задач пользователя
router.get('/:userId', taskController.getTasksByUser);

// Создание новой задачи
router.post('/', taskController.createTask);

// Обновление задачи (например, изменение приоритета или завершение)
router.put('/:taskId', taskController.updateTask);

// Удаление задачи
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;