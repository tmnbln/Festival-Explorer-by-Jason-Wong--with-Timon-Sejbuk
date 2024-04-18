const express = require('express');
const router = express.Router();
const auth = require('./controllers/auth');
const controller = require('./controllers/index')

router.get('/login', auth.login);

router.get('/callback', auth.callback);

router.get('/refresh_token', auth.refreshToken);

router.get('/festival', controller.getOneFestival);

router.get('/festivals', controller.getAllFestivals);

module.exports = router;