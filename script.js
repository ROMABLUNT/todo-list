const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const categorySelect = document.getElementById('category-select');
const taskInput = document.getElementById('task-input');
const dueDate = document.getElementById('due-date');

let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasksArray.forEach((task, index) => {
        const taskElement = document.createElement('li');
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        taskElement.textContent = `${task.text} [${task.category}] (Due: ${task.dueDate})`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => {
            tasksArray.splice(index, 1); 
            updateLocalStorage();
            renderTasks();
        });

        taskElement.addEventListener('click', () => {
            task.completed = !task.completed;
            updateLocalStorage();
            renderTasks();
        });

        taskElement.appendChild(deleteBtn);
        taskList.appendChild(taskElement);
    });
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

addTaskBtn.addEventListener('click', () => {
    const task = {
        text: taskInput.value,
        category: categorySelect.value,
        dueDate: dueDate.value,
        completed: false
    };

    if (task.text.trim() !== '') {
        tasksArray.push(task);
        updateLocalStorage();
        renderTasks();

        taskInput.value = '';
        dueDate.value = '';
    }
});

renderTasks();