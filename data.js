const fs = require('fs');
const file = './data.json';

let state = JSON.parse(fs.readFileSync(file, 'utf-8'));

function save() {
  fs.writeFileSync(file, JSON.stringify(state, null, 2));
}

module.exports = { state, save };