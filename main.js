const readline = require('readline');
const { addUser, getAllUsers } = require('./user');
const { addTask, viewTasks, getAllTasks, completeTask } = require('./task');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function prompt(q) { return new Promise(res => rl.question(q, res)); }

async function mainMenu() {
  while (true) {
    console.log('\nMenu:');
    console.log('1. Create User');
    console.log('2. Add Task');
    console.log('3. View Tasks by User');
    console.log('4. Mark Task as Completed');
    console.log('5. View All Tasks');
    console.log('6. Exit');
    const choice = await prompt('> ');

    switch (choice) {
      case '1': {
        const name = await prompt('Enter new username: ');
        addUser(name.trim());
        break;
      }
      case '2': {
        const users = getAllUsers();
        if (!users.length) { console.log('No users.'); break; }
        users.forEach((u,i) => console.log(`${i+1}. ${u.username}`));
        const sel = parseInt(await prompt('User #: '),10)-1;
        if (sel<0||sel>=users.length) { console.log('Invalid.'); break; }
        const title = await prompt('Task title: ');
        const cat   = await prompt('Category: ');
        addTask(title.trim(), cat.trim(), users[sel].id);
        break;
      }
      case '3': {
        const users = getAllUsers();
        if (!users.length) { console.log('No users.'); break; }
        users.forEach((u,i) => console.log(`${i+1}. ${u.username}`));
        const sel = parseInt(await prompt('User #: '),10)-1;
        if (sel<0||sel>=users.length) { console.log('Invalid.'); break; }
        viewTasks(users[sel].id);
        break;
      }
      case '4': {
        const users = getAllUsers();
        if (!users.length) { console.log('No users.'); break; }
        users.forEach((u,i) => console.log(`${i+1}. ${u.username}`));
        const sel = parseInt(await prompt('User #: '),10)-1;
        if (sel<0||sel>=users.length) { console.log('Invalid.'); break; }
        await completeTask(users[sel].id, prompt);
        break;
      }
      case '5': {
        const all = getAllTasks();
        if (!all.length) { console.log('No tasks.'); break; }
        const users = getAllUsers();
        all.forEach((t,i) => {
          const u = users.find(u=>u.id===t.userId) || {};
          console.log(
            `${i+1}. [${t.completed?'✔':' '}] ${t.title} ` +
            `| ${t.category} | ${u.username||'Unknown'}`
          );
        });
        break;
      }
      case '6':
        rl.close();
        return;
      default:
        console.log('Invalid choice.');
    }
  }
}

mainMenu();