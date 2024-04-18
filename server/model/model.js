const mongoose = require('./index');

const festivalSchema = new mongoose.Schema({
  name: String,
  festivalId: String,
  image: String,
  startDate: String,
  endDate: String,
  performer: [{
    type: String,
    name: String,
    performerId: String,
    image: String,
    bandOrMusician: String,
    performanceDate: String,
    performanceRank: Number,
    isHeadliner: Boolean,
  }]
});

const Festival = mongoose.model('Festival', festivalSchema);

async function getOneFestival(name) {
  return await Festival.find({'name': name});
}

async function getAllFestivals() {
  return await Festival.find({});
}

async function addFestival(festival) {
  const newFestival = await Festival.create(festival);
  return newFestival;
}

module.exports = {
  getOneFestival,
  getAllFestivals,
  addFestival,
}