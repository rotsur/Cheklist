let input = document.querySelector('#input');
let list = document.querySelector('#list');

window.addEventListener('load', function () {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        for (let task of tasks) {
            addTaskToList(task);
        }
    }
});

window.addEventListener('load', function () {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        for (let task of tasks) {
            addTaskToList(task);
        }
    }
});

input.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        let taskText = this.value.trim();
        if (taskText !== '') {
            let task = { text: taskText, done: false };
            addTaskToList(task);
            saveTasksToLocalStorage();
            this.value = '';
        }
    }
});

function addTaskToList(task) {
    let li = document.createElement('li');

    let taskElement = document.createElement('span');
    taskElement.classList.add('task');
    taskElement.textContent = task.text;
    taskElement.addEventListener('dblclick', function () {
        let text = this.textContent;
        this.textContent = '';

        let edit = document.createElement('input');
        edit.value = text;
        this.appendChild(edit);

        let self = this;
        edit.addEventListener('keypress', function (event) {
            if (event.key == 'Enter') {
                self.textContent = this.value;
                task.text = this.value;
                saveTasksToLocalStorage();
            }
        });
    });
    li.appendChild(taskElement);

    let remove = document.createElement('span');
    remove.textContent = 'удалить';
    remove.classList.add('remove');
    remove.addEventListener('click', function () {
        li.remove();
        saveTasksToLocalStorage();
    });
    li.appendChild(remove);

    let mark = document.createElement('span');
    mark.textContent = 'сделано';
    mark.classList.add('mark');
    mark.addEventListener('click', function () {
        task.done = !task.done;
        li.classList.toggle('done', task.done);
        saveTasksToLocalStorage();
    });
    li.appendChild(mark);

    if (task.done) {
        li.classList.add('done');
    }

    list.appendChild(li);
}

function saveTasksToLocalStorage() {
    let tasks = [];
    let taskElements = document.querySelectorAll('.task');
    for (let taskElement of taskElements) {
        let taskText = taskElement.textContent;
        let done = taskElement.parentElement.classList.contains('done');
        tasks.push({ text: taskText, done: done });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}