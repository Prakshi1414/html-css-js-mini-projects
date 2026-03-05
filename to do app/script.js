let tasks = [];

let taskInput = document.getElementById("taskinput");
let addBtn = document.getElementById("add-btn");
let taskList = document.getElementById("task-list");

// Load from localStorage
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  showTasks();
}

// Add task
addBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let text = taskInput.value.trim();
  if (text === "") {
    return;
  }

  let task = {
    text: text,
    completed: false,
  };

  tasks.push(task);
  taskInput.value = "";

  saveTasks();
  showTasks();
});

// Show tasks
function showTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");

    if (tasks[i].completed) {
      li.classList.add("completed");
    }

    li.innerHTML =
      '<div class="task">' +
      '<input type="checkbox" class="checkbox" ' +
      (tasks[i].completed ? "checked" : "") +
      ">" +
      '<span class="task-text">' +
      tasks[i].text +
      "</span>" +
      '<div class="task-icons">' +
      '<img src="images/editimg.png" alt="edit" class="edit-btn">' +
      '<img src="images/Delete.png" alt="delete" class="delete-btn">' +
      "</div>" +
      "</div>";

    // Checkbox event
    let checkbox = li.querySelector(".checkbox");
    checkbox.addEventListener("change", function () {
      tasks[i].completed = !tasks[i].completed;

      saveTasks();
      showTasks();
    });

    // Edit event
    let editBtn = li.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
      let newText = prompt("Edit your task:", tasks[i].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[i].text = newText.trim();

        saveTasks();
        showTasks();
      }
    });

    // Delete event
    let deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      tasks.splice(i, 1);

      saveTasks();
      showTasks();
    });

    taskList.appendChild(li);
  }

}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
