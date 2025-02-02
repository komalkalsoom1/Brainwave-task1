let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let isEditing = false;
let editTaskId = null;

const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const noTasksMessage = document.getElementById('no-tasks');

const renderTasks = () => {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    noTasksMessage.style.display = 'block';
  } else {
    noTasksMessage.style.display = 'none';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
      li.innerHTML = `
        <div>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
        </div>
        <div class="task-actions">
          <button class="complete" onclick="toggleCompletion(${task.id})">
            <i class="fas fa-check"></i>
          </button>
          <button class="edit" onclick="editTask(${task.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="delete" onclick="deleteTask(${task.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }
};

const addOrUpdateTask = () => {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title || !description) {
    alert('Please fill in both fields.');
    return;
  }

  if (isEditing) {
    tasks = tasks.map((task) =>
      task.id === editTaskId ? { ...task, title, description } : task
    );
    isEditing = false;
    editTaskId = null;
  } else {
    const newTask = {
      id: Date.now(),
      title,
      description,
      isCompleted: false,
    };
    tasks.push(newTask);
  }

  titleInput.value = '';
  descriptionInput.value = '';
  saveAndRender();
};

const toggleCompletion = (id) => {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
  );
  saveAndRender();
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  saveAndRender();
};

const editTask = (id) => {
  const task = tasks.find((task) => task.id === id);
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  isEditing = true;
  editTaskId = id;
};

const saveAndRender = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

addTaskBtn.addEventListener('click', addOrUpdateTask);
document.addEventListener('DOMContentLoaded', renderTasks);
