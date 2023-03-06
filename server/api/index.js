const { Router } = require('express');
const Users = require('./users');

const router = Router();

router.use(Users.router);

module.exports = { router };