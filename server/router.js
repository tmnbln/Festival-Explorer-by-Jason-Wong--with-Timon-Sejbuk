const express = require('express');
const router = express.Router();
const auth = require('./controllers/auth');

router.get('/login', auth.login);

router.get('/callback', auth.callback);

router.get('/refresh_token', auth.refreshToken);

module.exports = router;