let input = document.querySelector('#input');
let list = document.querySelector('#list');

input.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        let li = document.createElement('li');

        let task = document.createElement('span');
        task.classList.add('task');
        task.textContent = this.value;
        li.appendChild(task);

        let remove = document.createElement('span');
        remove.classList.add('remove');
        remove.textContent = 'удалить';
        li.appendChild(remove);

        let mark = document.createElement('span');
        mark.classList.add('mark');
        mark.textContent = 'сделано';
        li.appendChild(mark);

        list.appendChild(li);
        this.value = '';
    }
});