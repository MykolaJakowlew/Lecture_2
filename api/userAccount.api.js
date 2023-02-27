const { Router } = require('express');
const { UserAccount } = require('../models/userAccount');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const router = Router();

router.post("/users/registration", async (req, res) => {
 const { login, password } = req.body;
 const user = new UserAccount({
  login, password
 });
 try {
  const doc = await user.save();

  return res.status(200).send(doc);
 } catch (err) {
  console.error(err.toString());
  res.status(400).send({
   message: err.toString(),
  });
 }
});

router.get("/users/login", async (req, res) => {
 const { login, password } = req.query;
 if (!login) {
  return res.status(400).send({
   message: 'Parameter login is required'
  });
 }

 if (!password) {
  return res.status(400).send({
   message: 'Parameter password is required'
  });
 }

 const user = await UserAccount.findOne({ login });

 if (!user) {
  return res.status(400).send({
   message: 'We not found any user with combination'
  });
 }

 if (user.password !== password) {
  return res.status(401).send({
   message: 'Login or password is invalid'
  });
 }

 const jwtPayload = {
  _id: user._id,
  login: user.login
 };

 const token = jwt.sign(
  jwtPayload,
  // https://www.grc.com/passwords.htm
  process.env.JWT_TOKEN,
  { expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60 * 60 });

 // await UserAccount.findOneAndUpdate(
 //  { login, password },
 //  { $push: { tokens: token } }
 // );

 res.status(200).send({ token });
});


router.delete("/users/tokens", async (req, res) => {
 const { token } = req.body;

 await UserAccount.findOneAndUpdate(
  { tokens: token.toString() },
  { $pull: { tokens: token } },
 );

 res.status(200).send();
});

module.exports = { router };