document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
  });
  
  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
  
    tasks.forEach(function(task, index) {
      let li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      `;
      taskList.appendChild(li);
    });
  }
  
  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText !== '') {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text: taskText, completed: false });
      saveTasks(tasks);
      loadTasks();
      taskInput.value = '';
    }
  }
  
  function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
      tasks[index].text = newText.trim();
      saveTasks(tasks);
      loadTasks();
    }
  }
  
  function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
  }
  
  function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
  }