const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Загружаем сохраненные задачи из Local Storage или начинаем с пустого массива
let todosArray = JSON.parse(localStorage.getItem('todos')) || [];

// Функция для добавления новой задачи
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
        
        todoInput.value = ''; // Очищаем поле ввода
    }
}

// Функция для создания элемента задачи
function createTaskElement(task) {
    let li_Element = document.createElement('li');
    li_Element.textContent = task.text;

    // Если задача выполнена, добавляем класс completed
    if (task.completed) {
        li_Element.classList.add('completed');
    }

    // Добавляем событие клика для отметки задачи как выполненной
    li_Element.addEventListener('click', function() {
        li_Element.classList.toggle('completed');
        task.completed = li_Element.classList.contains('completed'); // Обновляем статус задачи
        postLocalStorage(); // Сохраняем изменения в Local Storage
    });

    // Создаем кнопку удаления
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('deleteButton');

    // Добавляем событие клика для удаления задачи
    deleteButton.addEventListener('click', () => {
        li_Element.remove(); // Удаляем элемент из DOM
        todosArray = todosArray.filter(t => t !== task); // Удаляем задачу из массива
        postLocalStorage(); // Сохраняем изменения в Local Storage
    });

    li_Element.appendChild(deleteButton);
    todoList.appendChild(li_Element); // Добавляем элемент в список
}

// Событие при нажатии на кнопку "Добавить"
addButton.addEventListener('click', addTodo);

// Событие при нажатии клавиши "Enter" для добавления задачи
todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Функция для сохранения массива задач в Local Storage
function postLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todosArray));
}

// Загружаем задачи из Local Storage при загрузке страницы
function loadTodosFromLocalStorage() {
    todosArray.forEach(task => {
        createTaskElement(task); // Восстанавливаем каждый элемент задачи
    });
}

// Загружаем задачи при загрузке страницы
loadTodosFromLocalStorage();
