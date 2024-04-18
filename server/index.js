const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router')

app.use(express.json())
  .use(cors())
  .use(cookieParser())
  .use(router);

  app.listen(8888, () => {
    console.log('Listening on 8888');
});
