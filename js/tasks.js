const taskList = document.querySelector(".js-taskList"),
    taskForm = document.querySelector(".js-tasksForm"),
    taskInput = taskForm.querySelector("input"),
    pendingColumn = taskList.querySelector(".pending__column"),
    finishedColumn = taskList.querySelector(".finished__column"),
    taskColumn = taskList.querySelector(".task__column"),
    pendingList = pendingColumn.querySelector("ul"),
    finishedList = finishedColumn.querySelector("ul");

const PENDING = "Pending",
    FINISHED = "Finished",
    SHOWING = "showing";

let pending, finished;

function taskObj(text) {
    return {
        id: String(Date.now()),
        text,
    };
}

function findPending(id) {
    return pending.find(function (task) {
        return task.id === id;
    });
}

function findFinished(id) {
    return finished.find(function (task) {
        return task.id === id;
    });
}

function rmPending(id) {
    pending = pending.filter(function (task) {
        return task.id !== id;
    });
}

function rmFinished(id) {
    finished = finished.filter(function (task) {
        return task.id !== id;
    });
}

function updatePending(task) {
    pending.push(task);
}

function updateFinished(task) {
    finished.push(task);
}

function deleteTask(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    rmPending(li.id);
    rmFinished(li.id);
    saveTasks();
}

function saveTasks() {
    localStorage.setItem(PENDING, JSON.stringify(pending));
    localStorage.setItem(FINISHED, JSON.stringify(finished));
}

function loadTasks() {
    pending = JSON.parse(localStorage.getItem(PENDING)) || [];
    finished = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function refresh() {
    pending.forEach(function (task) {
        paintPending(task);
    });
    finished.forEach(function (task) {
        paintFinished(task);
    });
}

function handleSubmit(e) {
    e.preventDefault();
    const task = taskObj(taskInput.value);
    taskInput.value = "";
    taskList.classList.add(SHOWING);
    paintPending(task);
    updatePending(task);
    saveTasks();
}

function handleFinBtn(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findPending(li.id);
    rmPending(li.id);
    updateFinished(task);
    paintFinished(task);
    saveTasks();
}

function handlePendBtn(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findFinished(li.id);
    rmFinished(li.id);
    updatePending(task);
    paintPending(task);
    saveTasks();
}

function globalLi(task) {
    const li = document.createElement("li"),
        span = document.createElement("span"),
        delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.classList.add("btn");
    delBtn.addEventListener("click", deleteTask);
    span.innerText = task.text;
    li.append(span, delBtn);
    li.id = task.id;
    return li;
}

function paintPending(task) {
    const li = globalLi(task);
    const finBtn = document.createElement("button");
    finBtn.innerText = "✅";
    finBtn.classList.add("btn");
    finBtn.addEventListener("click", handleFinBtn);
    li.appendChild(finBtn);
    pendingList.appendChild(li);
}

function paintFinished(task) {
    const li = globalLi(task);
    const pendBtn = document.createElement("button");
    pendBtn.innerText = "⏪";
    pendBtn.classList.add("btn");
    pendBtn.addEventListener("click", handlePendBtn);
    li.appendChild(pendBtn);
    finishedList.appendChild(li);
}

function init() {
    loadTasks();
    refresh();
    taskForm.addEventListener("submit", handleSubmit);
}
init();
