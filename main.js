const readline = require('readline');
const { initializeDB } = require('./db');
const { login } = require('./user');
const { addTask, viewTasks, completeTask } = require('./task');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function mainMenu(user) {
  while (true) {
    console.log(`\nCollaborative To-Do List Menu for ${user.username}:`);
    console.log('1. Add Task');
    console.log('2. View My Tasks');
    console.log('3. Mark Task as Completed');
    console.log('4. Exit');

    const choice = await prompt('Enter your choice: ');

    switch (choice) {
      case '1':
        const title = await prompt('Enter task title: ');
        const category = await prompt('Enter category: ');
        addTask(title, category, user.id);
        break;
      case '2':
        viewTasks(user.id);
        break;
      case '3':
        await completeTask(user.id, prompt);
        break;
      case '4':
        rl.close();
        process.exit(0);
      default:
        console.log('Invalid choice.');
    }
  }
}

async function main() {
  initializeDB();
  const user = await login(prompt);
  await mainMenu(user);
}

main();
