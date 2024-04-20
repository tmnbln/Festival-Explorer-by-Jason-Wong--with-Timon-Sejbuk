const model = require('../model/model');

const getOneFestival = async (req, res) => {
  try {
    const name = req.body.festivalName;
    const festival = await model.getOneFestival(name);
    res.status(200);
    res.send(festival);
  } catch (error) {
    console.log('e', error);
    res.status(500);
  }
};

const getAllFestivals = async (req, res) => {
  try {
    const festival = await model.getAllFestivals();
    res.status(200);
    res.send(festival);
  } catch (error) {
    console.log('e', error);
    res.status(500);
  }
};

module.exports = {
  getOneFestival,
  getAllFestivals,
};