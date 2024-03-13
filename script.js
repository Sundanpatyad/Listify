let form = document.querySelector('form');
let todoInput = document.querySelector('#todo-input');
let todoquantity = document.querySelector('#todo-quantity');
let addButton = document.querySelector('#add-button');
let todoList = document.querySelector('#todo-list');
const sugList = document.querySelectorAll(".sug-list li");

let todos = [];

function addTodo() {
    let todoText = todoInput.value.trim();
    let todoQuantity = todoquantity.value.trim(); 
    if (todoText.length > 0) {
        let currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        let ISTTime = new Date(currentTime);

        let todo = {
            id: ISTTime.toLocaleTimeString('en-IN', { hour12: true }), 
            text: todoText,
            quantity: todoQuantity,
            completed: false
        };

        todos.push(todo);

        todoInput.value = '';
        todoquantity.value = ''; 

        renderTodos();
    }
}

function toggleCompleted(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }

        return todo;
    });

    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);

    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        let todoItem = document.createElement('li');
        let todoid = document.createElement('span');
        let todoText = document.createElement('span');
        let todoQuantity = document.createElement('span');
        let todoButtonWrapper = document.createElement('span'); 
        let todoDeleteButton = document.createElement('button');
        let todoEditButton = document.createElement('button');

        todoid.textContent = todo.id;
        todoText.textContent = todo.text;

        todoQuantity.textContent = `( ${todo.quantity} )`; 
        todoDeleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        todoEditButton.innerHTML = '<i class="fa-solid fa-edit"></i>';

        todoDeleteButton.addEventListener('click', () => deleteTodo(todo.id));
        todoEditButton.addEventListener('click', () => enableEditMode(todoItem, todo));

        if (todo.completed) {
            todoItem.classList.add('completed');
        }

        todoItem.addEventListener('click', () => todoItem.classList.toggle('completed'));
        todoItem.addEventListener('click', () => todoItem.classList.toggle('light'));

        todoButtonWrapper.appendChild(todoEditButton);
        todoButtonWrapper.appendChild(todoDeleteButton);
        todoItem.appendChild(todoText);
        todoItem.appendChild(todoQuantity);
        todoItem.appendChild(todoid);
        todoItem.appendChild(todoButtonWrapper); 

        todoList.appendChild(todoItem);
    });
}

function enableEditMode(todoItem, todo) {
    const textElement = todoItem.querySelector('span:nth-child(2)');
    const editText = document.createElement('input');
    editText.value = todo.text;
    editText.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            todo.text = editText.value.trim();
            renderTodos();
        }
    });
    todoItem.replaceChild(editText, textElement);
    editText.focus();
}

form.addEventListener('submit', event => {
    event.preventDefault();
    addTodo();
});

renderTodos();