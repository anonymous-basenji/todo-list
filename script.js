document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('new-task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];

    tasks.forEach(task => renderTaskDOM(task));

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if(taskText === "") {
            alert("Please enter a task!");
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        renderTaskDOM(newTask);
        saveTasksToLocalStorage();

        taskInput.value = "";
        taskInput.focus();
    });

    function renderTaskDOM(task) {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.setAttribute('data-id', task.id);

        if(task.completed) {
            listItem.classList.add('completed');
        }

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');

        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => toggleCompleteStatus(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTaskItem(task.id));

        actionsDiv.appendChild(completeButton);
        actionsDiv.appendChild(deleteButton);

        listItem.appendChild(taskTextSpan);
        listItem.appendChild(actionsDiv);

        taskList.appendChild(listItem);
    }

    function toggleCompleteStatus(taskId) {
        console.log("Toggling complete for taskID:", taskId);
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if(taskIndex > -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;

            const listItem = taskList.querySelector(`.task-item[data-id="${taskId}"]`);

            if(listItem) {
                listItem.classList.toggle('completed');

                const completeBtn = listItem.querySelector('.complete-btn');
                if(completeBtn) {
                    completeBtn.textContent = tasks[taskIndex].completed ? 'Undo' : 'Complete';
                }
                saveTasksToLocalStorage();
            }
        }
    }

    function deleteTaskItem(taskId) {
        console.log("Deleting task ID:", taskId);

        tasks = tasks.filter(task => task.id != taskId);

        const listItem = taskList.querySelector(`.task-item[data-id="${taskId}"]`);
        if(listItem) {
            taskList.removeChild(listItem);
        }
        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }
})