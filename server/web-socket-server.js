const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');
const setTelegramWebhook = require('./telegram_bot');

const emitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(bodyParser.json());
setTelegramWebhook(app, emitter);
require('./websocket');

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/login', (req, res) => {
 const { id } = req.query;
 if (!id) {
  return res.status(400).send({
   message: 'parameter id is required'
  });
 }
 const eventName = `login-${id}`;
 console.log(`Wait on login id:${id} event:<${eventName}>`);
 emitter.once(eventName, (userInfo) => {
  res.status(200).send(userInfo);
 });
});

app.listen(
 process.env.PORT,
 () => console.log(`Server was started on ${process.env.PORT}`)
);