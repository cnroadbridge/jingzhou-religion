const { v4: uuidv4 } = require('uuid');

function generateUUID() {
  return uuidv4().replace(/-/g, '');
}

function getRandomNumber(n) {
  return Math.random().toString().substr(-n);
}

module.exports = {
  generateUUID,
  getRandomNumber,
};
