const model = require('../model/model');

const getOneFestival = async (req, res) => {
  try {
    const name = req.body.festivalName;
    const festival = await model.getOneFestival(name);
    res.status(200).json(festival);
  } catch (error) {
    console.log('e', error);
    res.status(500);
  }
};

const getAllFestivals = async (req, res) => {
  try {
    const festivals = await model.getAllFestivals();
    res.status(200).json(festivals);
  } catch (error) {
    console.log('e', error);
    res.status(500);
  }
};

const getFestivalSuggestions = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is missing' });
    }
    const suggestions = await model.getFestivalSuggestions(query);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error fetching festival suggestions:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};


module.exports = {
  getOneFestival,
  getAllFestivals,
  getFestivalSuggestions
};