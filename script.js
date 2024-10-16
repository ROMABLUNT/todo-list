const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Загружаем сохраненные задачи из Local Storage или начинаем с пустого массива
let todosArray = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
    const todoText = todoInput.value;
    if (todoText) {
        const newTask = {
            text: todoText,
            completed: false
        };

        createTaskElement(newTask);
        
        // Добавляем новую задачу в массив и сохраняем его в Local Storage
        todosArray.push(newTask);
        postLocalStorage();
        
        todoInput.value = ''; 
    }
}

function createTaskElement(task) {
    let li_Element = document.createElement('li');
    li_Element.textContent = task.text;

    if (task.completed) {
        li_Element.classList.add('completed');
    }

    li_Element.addEventListener('click', function() {
        li_Element.classList.toggle('completed');
        task.completed = li_Element.classList.contains('completed'); 
        postLocalStorage(); 
    });

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('deleteButton');

    deleteButton.addEventListener('click', () => {
        li_Element.remove();
        todosArray = todosArray.filter(t => t !== task); 
        postLocalStorage(); 
    });

    li_Element.appendChild(deleteButton);
    todoList.appendChild(li_Element); 
}

addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function postLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todosArray));
}

function loadTodosFromLocalStorage() {
    todosArray.forEach(task => {
        createTaskElement(task); 
    });
}

// Загружаем задачи при загрузке страницы
loadTodosFromLocalStorage();
