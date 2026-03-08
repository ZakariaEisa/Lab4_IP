class Task {
  constructor(id, description) {
    this.id = id;
    this.description = description;
    this.completed = false;
  }
}

const tasks = [];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.dataset.id = String(task.id);

    const text = document.createElement("p");
    text.className = "task-text";
    if (task.completed) {
      text.classList.add("completed");
    }
    text.textContent = task.description;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";

    text.addEventListener("click", () => toggleTask(task.id));
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    listItem.append(text, deleteBtn);
    taskList.appendChild(listItem);
  });
}

function addTask(description) {
  const id = Date.now() + Math.floor(Math.random() * 1000);
  const newTask = new Task(id, description);
  tasks.push(newTask);
  renderTasks();
}

function toggleTask(taskId) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return;
  task.completed = !task.completed;
  renderTasks();
}

function deleteTask(taskId) {
  const index = tasks.findIndex((item) => item.id === taskId);
  if (index === -1) return;
  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = taskInput.value.trim();
  if (!value) return;
  addTask(value);
  taskInput.value = "";
  taskInput.focus();
});
