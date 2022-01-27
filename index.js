const btnAdd = document.querySelector(".btn-add");
const iptTask = document.querySelector(".todo-input");
const divTodoContainer = document.querySelector(".todo-container");
const dropDownSelect = document.querySelector(".filter-todos");

btnAdd.addEventListener("click", addTodo);
divTodoContainer.addEventListener("click", checkandRemove);
document.addEventListener("DOMContentLoaded", loadDb);
dropDownSelect.addEventListener("click", filterTodos);

function addTodo(e) {
  e.preventDefault();
  const newDiv = document.createElement("div");
  newDiv.classList.add("todo");
  newDiv.innerHTML = `<span> ${iptTask.value} </span>
  <i class="fas fa-edit"></i>
  <i class="fas fa-trash"></i>
  <i class="far fa-check-square"></i>`;
  divTodoContainer.appendChild(newDiv);
  saveToDb(newDiv.innerHTML);
  iptTask.value = "";
}

function deleteTodo(e) {
  console.log(e.target.parentElement);
  const divParent = e.target.parentElement;
  divParent.remove();
}

function checkandRemove(e) {
  const classOfTarget = [...e.target.classList];
  if (classOfTarget[1] === "fa-edit") {
    removeFromDb(e.target.parentElement);
    e.target.parentElement.remove();
    iptTask.value = e.target.parentElement.querySelector("span").textContent;
  } else if (classOfTarget[1] === "fa-trash") {
    removeFromDb(e.target.parentElement);
    e.target.parentElement.remove();
  } else if (classOfTarget[1] === "fa-check-square") {
    removeFromDb(e.target.parentElement);
    e.target.parentElement.querySelector("span").classList.toggle("complete");
    saveToDb(e.target.parentElement.innerHTML);
  }
}

function saveToDb(newItem) {
  const dbData = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  dbData.push(newItem);
  localStorage.setItem("todos", JSON.stringify(dbData));
}

function loadDb() {
  const dbData = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  dbData.forEach((element) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    newDiv.innerHTML = element;
    divTodoContainer.appendChild(newDiv);
  });
}

function removeFromDb(todo) {
  const dbData = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filterTodos = dbData.filter((element) => element != todo.innerHTML);
  localStorage.setItem("todos", JSON.stringify(filterTodos));
}

function filterTodos(e) {
  const todos = [...divTodoContainer.childNodes];
  todos.forEach((element) => {
    const spanIn = element.querySelector("span").classList;
    if (e.target.value == 1) {
      element.style.display = "flex";
    } else if (e.target.value == 2) {
      if (spanIn[0] == "complete") element.style.display = "flex";
      else element.style.display = "none";
    } else if (e.target.value == 3) {
      if (spanIn[0] == "complete") element.style.display = "none";
      else element.style.display = "flex";
    }
  });
}
