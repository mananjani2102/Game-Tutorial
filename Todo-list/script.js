// DOM elements
var todoList = [];
var comdoList = [];
var remList = [];

var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteSButton = document.getElementById("delete-selected");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");

// event listeners

function updateList() {
    // separating completed and incomplete
    comdoList = todoList.filter(data => data.complete === true);
    remList = todoList.filter(data => data.complete === false);

    document.querySelector('#r-count').textContent = remList.length; // FIXED
    document.querySelector('#c-count').textContent = comdoList.length; // BEST PRACTICE
}

function appendTask(todoList) {
    allTodos.innerHTML = "";

    todoList.forEach((element) => {
        var contentHtml = element.complete ? `<strike>${element.content}</strike>` : element.content;
        var x = `
        <li id="${element.id}" class="todo-item">
            <p class="task"> 
                ${contentHtml}
            </p>

            <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class="ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error">
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;

        allTodos.innerHTML += x;
    });
}

function addTask() {
    var task = todoInput.value.trim(); // FIXED blank check

    if (task === "") {
        alert("No content added, please enter something.");
        return;
    }

    todoList.push({
        content: task,
        id: Date.now().toString(),
        complete: false
    });

    todoInput.value = ""; // clear input after adding

    updateList();
    appendTask(todoList);
}

addButton.addEventListener("click", addTask);

todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

function deleteTask(event) {
    var item = event.target.closest('.todo-item');
    if (!item) return;

    var id = item.getAttribute('id');

    todoList = todoList.filter((data) => {
        return data.id != id;
    });
    updateList();
    appendTask(todoList);
}

function complete(event) {
    var item =

    todoList.forEach((data) => {
        if (data.id == id) {
            data.complete = !data.complete;
        }
    });
    updateList();
    appendTask(todoList);
}

document.addEventListener('click', (event) => {
    if (event.target.closest('.delete')) {
        deleteTask(event);
        return;
    }
    if (event.target.closest('.complete') || event.target.closest('.ci')) {
        complete(event);
        return;
    }
});

function deleteAll() {
    todoList = [];
    updateList();
    appendTask(todoList);
}

deleteAllButton.addEventListener("click", deleteAll);

function deleteS() {
    todoList = todoList.filter((data) => {
        return !data.complete;
    });
    updateList();
    appendTask(todoList);
}

deleteSButton.addEventListener("click", deleteS);

