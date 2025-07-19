const { state, save } = require('./data');

function addUser(username) {
  if (state.users.find(u => u.username === username)) {
    console.log('Username already exists.');
    return;
  }
  state.users.push({ id: state.nextUserId++, username });
  save();
  console.log(`User '${username}' added.`);
}

function getAllUsers() {
  return state.users;
}

module.exports = { addUser, getAllUsers };