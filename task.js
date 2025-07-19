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
  if (userTasks.length === 0) {
    console.log('No tasks found for this user.');
  } else {
    userTasks.forEach((task, i) => {
      console.log(
        `${i+1}. [${task.completed ? '✔' : ' '}] ` +
        `${task.title} | Category: ${task.category}`
      );
    });
  }
}

function getAllTasks() {
  return state.tasks;
}

async function completeTask(userId, prompt) {
  const userTasks = state.tasks.filter(t => t.userId === userId);
  if (!userTasks.length) {
    console.log('No tasks found for this user.');
    return;
  }
  userTasks.forEach((t, i) => {
    console.log(
      `${i+1}. [${t.completed ? '✔' : ' '}] ` +
      `${t.title} | Category: ${t.category}`
    );
  });
  const idx = parseInt(await prompt('Enter task number to mark as completed: '),10) -1;
  if (idx >= 0 && idx < userTasks.length) {
    userTasks[idx].completed = true;
    save();
    console.log('Task marked as completed.');
  } else {
    console.log('Invalid task number.');
  }
}

module.exports = { addTask, viewTasks, getAllTasks, completeTask };