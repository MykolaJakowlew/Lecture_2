const ws = require('ws');
const wss = new ws.Server(
 { port: process.env.SOCKET_PORT },
 () => {
  console.log(`Socket server started on ${process.env.SOCKET_PORT}`);
 }
);

const sendToAll = (message) => {
 wss.clients.forEach(ws => ws.send(JSON.stringify(message)));
};

wss.on('connection', (ws) => {
 console.log(`New connection was created`);
 ws.on('message', (messageString) => {
  const message = JSON.parse(messageString);
  console.log('message', message);
  sendToAll(message);
 });
 ws.on('close', (reason) => {
  console.log(`Connection was closed`, reason);
 });
});