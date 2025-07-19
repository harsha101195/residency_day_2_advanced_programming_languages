async function addTask() {
    const title = await prompt('Enter task title: ');
    const category = await prompt('Enter category: ');
    const user = await prompt('Assign to user: ');

    if (!tasks[user]) {
        tasks[user] = [];
    }

    tasks[user].push({
        title: title,
        category: category,
        completed: false
    });

    saveTasks();
    console.log('Task added for user:', user);
}

async function main() {
    while (true) {
        console.log('\nCollaborative To-Do List Menu:');
        console.log('1. Add Task');
        console.log('2. View Tasks by User');
        console.log('3. Mark Task as Completed');
        console.log('4. Exit');

        const choice = await prompt('Enter your choice: ');

        switch (choice) {
            case '1':
                await addTask();
                break;
	    /*
            case '2':
                await viewTasks();
                break;
            case '3':
                await completeTask();
                break;
            case '4':
                rl.close();
                return;
	    */
            default:
                console.log('Invalid choice.');
        }
    }
}

main();