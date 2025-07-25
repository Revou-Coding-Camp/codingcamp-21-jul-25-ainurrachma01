// DOM elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const dateInput = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const deleteAllBtn = document.getElementById('delete-all');
const searchInput = document.getElementById('search');
const totalEl = document.getElementById('total');
const completedEl = document.getElementById('completed');
const pendingEl = document.getElementById('pending');
const progressEl = document.getElementById('progress');
let tasks = [];

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  totalEl.textContent = total;
  completedEl.textContent = completed;
  pendingEl.textContent = pending;
  progressEl.textContent = `${progress}%`;
}

function renderTasks(filter = '') {
  todoList.innerHTML = '';

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredTasks.length === 0) {
    todoList.innerHTML = '<tr><td colspan="4">No tasks found</td></tr>';
    return;
  }

  filteredTasks.forEach((task, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date}</td>
      <td>${task.completed ? '✅ Done' : '⏳ Pending'}</td>
      <td>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </td>
    `;

    todoList.appendChild(row);
  });

  updateStats();
}

function addTask(e) {
  e.preventDefault();

  const text = input.value.trim();
  const date = dateInput.value;

  if (!text || !date) return alert('Please enter a task and a due date');

  tasks.push({ text, date, completed: false });

  input.value = '';
  dateInput.value = '';
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks(searchInput.value);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(searchInput.value);
}

function deleteAll() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    tasks = [];
    renderTasks();
  }
}

form.addEventListener('submit', addTask);
deleteAllBtn.addEventListener('click', deleteAll);
searchInput.addEventListener('input', () => renderTasks(searchInput.value));

document.addEventListener('DOMContentLoaded', () => {
  const deleteAllBtn = document.getElementById('delete-all');

  deleteAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
      tasks = [];
      renderTasks();
    }
  });
});
// Initial render
renderTasks();
