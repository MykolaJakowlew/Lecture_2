const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const loggerMiddleware = require('./middleware/logger');

process.addListener('uncaughtException', (err) => {
 console.error(`[uncaughtException] err:${err.toString()}`, err);
});
process.addListener('unhandledRejection', (err) => {
 console.error(`[unhandledRejection] err:${err.toString()}`, err);
});

const setupMongoDB = require('./setup/mongoose');
const API = require('./api');

const app = express();

const bootstrap = async () => {
 app.use(express.static(path.join(__dirname, '../public/dist')));
 app.use(cors());
 app.use(bodyParser.json());

 app.use(loggerMiddleware);

 await setupMongoDB();

 app.use(API.router);

 app.listen(process.env.PORT, () => console.log(`Server was started on ${process.env.PORT}`));
};

bootstrap();