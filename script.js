const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function addTodo() {
    const todoText = todoInput.value;
    if (todoText) {
        let li_Element = document.createElement('li');
        li_Element.textContent = todoText;
        li_Element.addEventListener('click', function() {
            li_Element.classList.toggle('completed'); 
        })
        todoList.appendChild(li_Element);
        todoInput.value = '';
    }
}
addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

