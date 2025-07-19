const { db } = require('./db');

function addTask(title, category, userId) {
  db.run(
    `INSERT INTO tasks (title, category, completed, user_id) VALUES (?, ?, 0, ?)`,
    [title, category, userId],
    function (err) {
      if (err) throw err;
      console.log('Task added.');
    }
  );
}

function viewTasks(userId) {
  db.all(`SELECT * FROM tasks WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) throw err;

    if (rows.length === 0) {
      console.log('No tasks found.');
    } else {
      rows.forEach((task, index) => {
        console.log(`${index + 1}. [${task.completed ? '✔' : ' '}] ${task.title} | Category: ${task.category}`);
      });
    }
  });
}

async function completeTask(userId, prompt) {
  db.all(`SELECT * FROM tasks WHERE user_id = ?`, [userId], async (err, rows) => {
    if (err) throw err;

    if (rows.length === 0) {
      console.log('No tasks found.');
      return;
    }

    rows.forEach((task, index) => {
      console.log(`${index + 1}. [${task.completed ? '✔' : ' '}] ${task.title} | Category: ${task.category}`);
    });

    const index = parseInt(await prompt('Enter task number to mark as completed: ')) - 1;

    if (index >= 0 && index < rows.length) {
      const taskId = rows[index].id;
      db.run(`UPDATE tasks SET completed = 1 WHERE id = ?`, [taskId], function (err) {
        if (err) throw err;
        console.log('Task marked as completed.');
      });
    } else {
      console.log('Invalid task number.');
    }
  });
}

module.exports = { addTask, viewTasks, completeTask };
