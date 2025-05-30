document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('new-task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

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
        renderTask(newTask);

        taskInput.value = "";
        taskInput.focus();
    });

    function renderTask(task) {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.setAttribute('data-id', task.id);

        if(task.completed) {
            listItem.classList.add('completed');
        }

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;

        const actionsDiv = document.createElement('div');
        taskTextSpan.textContent = task.text;

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');

        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => toggleComplete(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        actionsDiv.appendChild(completeButton);
        actionsDiv.appendChild(deleteButton);

        listItem.appendChild(taskTextSpan);
        listItem.appendChild(actionsDiv);

        taskList.appendChild(listItem);
    }

    function toggleComplete(taskId) {
        console.log("Toggling complete for taskID:", taskId);
    }

    function deleteTask(taskId) {
        console.log("Deleting task ID:", taskId);
    }
})