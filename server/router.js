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

module.exports = router;