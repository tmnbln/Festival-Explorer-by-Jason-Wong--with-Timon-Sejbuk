const mongoose = require('mongoose');
const dbName = 'festify';

async function connect() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
  console.log('db connected');
}

connect().catch(err => console.log(err));

module.exports = mongoose;