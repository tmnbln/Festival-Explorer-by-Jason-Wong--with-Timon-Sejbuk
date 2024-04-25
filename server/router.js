const express = require('express');
const router = express.Router();
const auth = require('./controllers/auth');
const controller = require('./controllers/index')

// spotify login
router.get('/login', auth.login);

router.get('/callback', auth.callback);

router.get('/refresh_token', auth.refreshToken);

// get festival data for specific festival
router.post('/festival', controller.getOneFestival);

// get all festivals
router.get('/festivals', controller.getAllFestivals);

// seed data
router.get('/seed', async (req, res) => {
    try {
      require('./data/index');
      res.status(200).json({ message: '✨ Data seeded successfully' });
    } catch (error) {
      console.error('Error seeding data:', error);
      res.status(500).json({ error: '🦆 Error seeding data' });
    }
  });

module.exports = router;