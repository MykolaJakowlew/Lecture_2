const { Router } = require('express');

const router = Router();

router.post('/login', async (req, res) => {

 return res.status(200).send();
});

module.exports = { router };