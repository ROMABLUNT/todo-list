const db = require('../db');

// Получение всех задач для пользователя
exports.getTasksByUser = (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM tasks WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json(results);
    });
};

// Создание новой задачи
exports.createTask = (req, res) => {
    const { userId, task_name, priority, due_date } = req.body;

    if (!userId || !task_name || !priority) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const query = 'INSERT INTO tasks (user_id, task_name, priority, due_date) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, task_name, priority, due_date], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(201).json({ message: 'Task created successfully' });
    });
};

// Обновление задачи
exports.updateTask = (req, res) => {
    const taskId = req.params.taskId;
    const { task_name, priority, completed, due_date } = req.body;

    const query = 'UPDATE tasks SET task_name = ?, priority = ?, completed = ?, due_date = ? WHERE id = ?';
    db.query(query, [task_name, priority, completed, due_date, taskId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'Task updated successfully' });
    });
};

// Удаление задачи
exports.deleteTask = (req, res) => {
    const taskId = req.params.taskId;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [taskId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'Task deleted successfully' });
    });
};