document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('new-task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskText = tastInput.value.trim();

        if(taskText === "") {
            alert("Please enter a task!");
            return;
        }
    })
})