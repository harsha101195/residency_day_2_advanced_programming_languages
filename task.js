const { state, save } = require('./data');

function addTask(title, category, userId) {
  state.tasks.push({
    id: state.nextTaskId++,
    title,
    category,
    completed: false,
    userId
  });
  save();
  console.log('Task added.');
}

function viewTasks(userId) {
  const userTasks = state.tasks.filter(t => t.userId === userId);
  if (!userTasks.length) {
    console.log('No tasks for this user.');
    return;
  }
  userTasks.forEach((t, i) => {
    console.log(
      `${i+1}. [${t.completed ? '✔' : ' '}] ${t.title} | Category: ${t.category}`
    );
  });
}

function getAllTasks() {
  return state.tasks;
}

async function completeTask(userId, prompt) {
  const userTasks = state.tasks.filter(t => t.userId === userId);
  if (!userTasks.length) {
    console.log('No tasks for this user.');
    return;
  }
  userTasks.forEach((t, i) => {
    console.log(
      `${i+1}. [${t.completed ? '✔' : ' '}] ${t.title} | Category: ${t.category}`
    );
  });
  const idx = parseInt(await prompt('Task # to complete: '), 10) - 1;
  if (idx >= 0 && idx < userTasks.length) {
    userTasks[idx].completed = true;
    save();
    console.log('Task marked completed.');
  } else {
    console.log('Invalid number.');
  }
}

async function deleteTask(userId, prompt) {
  const userTasks = state.tasks.filter(t => t.userId === userId);
  if (!userTasks.length) {
    console.log('No tasks for this user.');
    return;
  }
  userTasks.forEach((t, i) => {
    console.log(
      `${i+1}. [${t.completed ? '✔' : ' '}] ${t.title} | Category: ${t.category}`
    );
  });
  const idx = parseInt(await prompt('Task # to delete: '), 10) - 1;
  if (idx >= 0 && idx < userTasks.length) {
    const taskToDelete = userTasks[idx];
    const globalIdx = state.tasks.findIndex(t => t.id === taskToDelete.id);
    state.tasks.splice(globalIdx, 1);
    save();
    console.log('Task deleted.');
  } else {
    console.log('Invalid number.');
  }
}

module.exports = { addTask, viewTasks, getAllTasks, completeTask, deleteTask };