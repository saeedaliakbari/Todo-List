const btnAdd = document.querySelector(".btn-add");
const iptTask = document.querySelector(".todo-input");
const btnDelete = document.querySelector(".fa-trash");
const btnEdit = document.querySelector(".fa-edit");
const btnComplete = document.querySelector(".fa-check-square");
const divTodoContainer = document.querySelector(".todo-container");

btnAdd.addEventListener("click", addTodo);
btnDelete.addEventListener("click", deleteTodo);

function addTodo(e) {
  e.preventDefault();
  const newDiv = document.createElement("div");
  newDiv.classList.add("todo");
  newDiv.innerHTML = `<span> ${iptTask.value} </span>
  <i class="fas fa-edit"></i>
  <i class="fas fa-trash"></i>
  <i class="far fa-check-square"></i>`;
  divTodoContainer.appendChild(newDiv);
  iptTask.value = "";
}

function deleteTodo(e) {
  const divParent = e.target.parentElement;
  divParent.remove();
}
