document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded shadow ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="flex items-center">
                    <input type="checkbox" class="mr-2" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${task.text}</span>
                </div>
                <div>
                    <button class="edit-btn p-1 text-blue-500 hover:text-blue-600">
                        <i data-lucide="edit-2"></i>
                    </button>
                    <button class="delete-btn p-1 text-red-500 hover:text-red-600">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            const editBtn = li.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                const newText = prompt('Редагувати задачу на:', task.text);
                if (newText !== null) {
                    task.text = newText;
                    saveTasks();
                    renderTasks();
                }
            });

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            taskList.appendChild(li);
        });
        lucide.createIcons();
    }

    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    renderTasks();
});

