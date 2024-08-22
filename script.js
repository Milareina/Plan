document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const clearTasksBtn = document.getElementById("clear-tasks-btn");
    const taskList = document.getElementById("task-list");
    const noTasksMessage = document.getElementById("no-tasks-message");

    function updateUI() {
        const tasks = taskList.querySelectorAll("li");
        if (tasks.length === 0) {
            noTasksMessage.style.display = "block";
            clearTasksBtn.disabled = true;
        } else {
            noTasksMessage.style.display = "none";
            clearTasksBtn.disabled = false;
        }
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => addTaskToList(task.text, task.completed));
        updateUI();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            tasks.push({
                text: li.querySelector("span").textContent,
                completed: li.querySelector("input").checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTaskToList(taskText, completed = false) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", saveTasks);

        const span = document.createElement("span");
        span.textContent = taskText;

        li.appendChild(checkbox);
        li.appendChild(span);
        taskList.appendChild(li);
    }

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTaskToList(taskText);
            taskInput.value = "";
            saveTasks();
            updateUI();
        }
    });

    clearTasksBtn.addEventListener("click", function () {
        taskList.innerHTML = "";
        saveTasks();
        updateUI();
    });

    loadTasks();
});
