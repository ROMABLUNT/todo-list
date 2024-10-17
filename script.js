const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const categorySelect = document.getElementById('category-select');
const taskInput = document.getElementById('task-input');
const dueDate = document.getElementById('due-date');


addTaskBtn.addEventListener('click', () => {
    let taskElement = document.createElement('li');
    taskElement.textContent = taskInput.value;
    let taskElementBtn = document.createElement('button');
    taskElement.appendChild(taskElementBtn);
})