const express = require('express');
const cors = require("cors");
const events = require('events');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 8000;
const app = express();
const emitter = new events.EventEmitter();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/connect', (req, res) => {
 res.writeHead(
  200,
  {
   'Connection': 'keep alive',
   'Content-Type': 'text/event-stream',
   'Cache-Control': 'no-cache'
  }
 );
 emitter.on('new-message', (message) => {
  res.write('data: ' + JSON.stringify(message) + ' \n\n');
 });
});

app.post('/messages', (req, res) => {
 const message = req.body;
 emitter.emit('new-message', message);
 return res.status(200).send();
});

app.listen(PORT, () => console.log(`Server was started on port ${PORT}`));