const readline = require('readline');
const { addUser, getAllUsers } = require('./user');
const {
  addTask,
  viewTasks,
  getAllTasks,
  completeTask,
  deleteTask
} = require('./task');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = q => new Promise(res => rl.question(q, res));

async function mainMenu() {
  while (true) {
    console.log('\nMenu:');
    console.log('1. Create User');
    console.log('2. Add Task');
    console.log('3. View Tasks by User');
    console.log('4. Complete Task');
    console.log('5. Delete Task');
    console.log('6. View All Tasks');
    console.log('7. Exit');
    const choice = await prompt('> ');

    switch (choice.trim()) {
      case '1': {
        const name = await prompt('New username: ');
        addUser(name.trim());
        break;
      }
      case '2': {
        const users = getAllUsers();
        if (!users.length) { console.log('No users.'); break; }
        users.forEach((u,i) => console.log(`${i+1}. ${u.username}`));
        const sel = parseInt(await prompt('User #: '), 10) - 1;
        if (sel<0||sel>=users.length) { console.log('Invalid.'); break; }
        const t = await prompt('Title: ');
        const c = await prompt('Category: ');
        addTask(t.trim(), c.trim(), users[sel].id);
        break;
      }
      case '3': {
        const users = getAllUsers();
        if (!users.length) { console.log('No users.'); break; }
        users.forEach((u,i) => console.log(`${i+1}. ${u.username}`));
        const sel = parseInt(await prompt('User #: '), 10) - 1;
        if (sel<0||sel>=users.length) { console.log('Invalid.'); break; }
        viewTasks(users[sel].id);
        break;
      }
      case '4': {
        const users = getAllUsers();
        if (!users.length) { console.log('No users.'); break; }
        users.forEach((u,i) => console.log(`${i+1}. ${u.username}`));
        const sel = parseInt(await prompt('User #: '), 10) - 1;
        if (sel<0||sel>=users.length) { console.log('Invalid.'); break; }
        await completeTask(users[sel].id, prompt);
        break;
      }
      case '5': {
        const users = getAllUsers();
        if (!users.length) { console.log('No users.'); break; }
        users.forEach((u,i) => console.log(`${i+1}. ${u.username}`));
        const sel = parseInt(await prompt('User #: '), 10) - 1;
        if (sel<0||sel>=users.length) { console.log('Invalid.'); break; }
        await deleteTask(users[sel].id, prompt);
        break;
      }
      case '6': {
        const tasks = getAllTasks();
        const users = getAllUsers();
        if (!tasks.length) { console.log('No tasks at all.'); break; }
        tasks.forEach((t,i) => {
          const u = users.find(u=>u.id===t.userId) || {};
          console.log(
            `${i+1}. [${t.completed?'✔':' '}] ${t.title} ` +
            `| ${t.category} | User: ${u.username||'Unknown'}`
          );
        });
        break;
      }
      case '7':
        rl.close();
        return;
      default:
        console.log('Invalid choice.');
    }
  }
}

mainMenu();