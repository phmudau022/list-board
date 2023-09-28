const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToDOM(task));
});

addButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Write something');
        
    } else {
        const task = { text: taskText, done: false };
        addTaskToDOM(task);
        saveTasksToLocalStorage();
        taskInput.value = '';
    }
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.done;
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    if (task.done) {
        taskSpan.style.textDecoration = 'line-through';
        // alert('Done');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.className = 'x-button';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        alert('Deleted');
        saveTasksToLocalStorage();
    });

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Add event listener to mark tasks as done
taskList.addEventListener('change', function(event) {
    if (event.target.classList.contains('task-checkbox')) {
        const taskSpan = event.target.nextElementSibling;
        if (event.target.checked) {
            taskSpan.style.textDecoration = 'line-through';
            // alert('Done');
        } else {
            taskSpan.style.textDecoration = 'none';
        }
        saveTasksToLocalStorage();
    }
});

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map(li => ({
        text: li.querySelector('span').textContent,
        done: li.querySelector('.task-checkbox').checked
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
