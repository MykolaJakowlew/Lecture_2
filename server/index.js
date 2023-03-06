const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { setupDb } = require('./setup/mongoose');
const API = require('./api');

const app = express();

const setup = async () => {

 app.use(bodyParser.json());
 app.use(cors());
 // __dirname -- name of folder
 // console.log(path.join('../public'));
 // console.log(path.join(__dirname, '../public'));
 // console.log(path.join(__dirname, '../../public'));
 // console.log(path.join(__dirname, './public'));

 app.use(express.static(path.join(__dirname, '../public/dist')));
 await setupDb();
 app.use("/services", API.router);

 app.all('*', (req, res) => {
  console.log(`method: ${req.method}, url: ${req.url}`);
  return res.status(404).send({ message: 'Route was not found' });
 });

 app.listen(process.env.PORT, () => {
  console.log(`Server was started ${process.env.PORT}`);
 });
};

setup();