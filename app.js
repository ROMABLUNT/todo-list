const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Подключаем маршруты
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});