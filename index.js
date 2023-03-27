//selector
const todoInput = document.querySelector(".todo-input");
const todoAddBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-container");
const todoFilter = document.querySelector(".filter-todos");
//event listener
todoAddBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
todoFilter.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
//functions
function addTodo(e) {
  e.preventDefault();
  //   console.log(e);
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = `<li>${todoInput.value}</li>
    <span><i class="fa fa-trash-alt"></i></span>
    <span><i class="fa fa-check-square"></i></span>`;
  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

function checkRemove(e) {
  const listClassTodo = [...e.target.classList];
  const item = e.target;
  if (listClassTodo[1] === "fa-trash-alt") {
    const thisTodo = item.parentElement.parentElement;
    rmeoveLocalTodos(thisTodo);
    thisTodo.remove();
  } else if (listClassTodo[1] === "fa-check-square") {
    const thisTodo = item.parentElement.parentElement;
    thisTodo.classList.toggle("completed");
  }
}

function filterTodos(e) {
  const todoArray = [...todoList.childNodes];
  console.log(todoArray);
  todoArray.forEach((todo) => {
    switch (e.target.value) {
      case "1":
        todo.style.display = "flex";
        break;
      case "2":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "3":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // console.log(localStorage.getItem("todos"));
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `<li>${todo}</li>
      <span><i class="fa fa-trash-alt"></i></span>
      <span><i class="fa fa-check-square"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
}

function rmeoveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filterTodos = savedTodos.filter((t) => {
    return t !== todo.children[0].innerText;
  });
  localStorage.setItem("todos", JSON.stringify(filterTodos));
}
