const mongoose = require('mongoose');

const { Tables, Waiters } = require('../../../models');

/**
 * 
 * @param {Object} req 
 * @param {Object} req.body
 * @param {(ObjectId | null)=} req.body.orderId
 * @param {(ObjectId | null)=} req.body.waiterId
 * @param {*} res 
 */
module.exports.updateTable = async (req, res) => {
 const { _id } = req.params;
 const { orderId, waiterId } = req.body;

 if (![orderId, waiterId].find(e => e !== undefined)) {
  return res.status(400).send({
   message: 'Body is empty'
  });
 }

 if (waiterId) {
  const waiter = await Waiters.findById(waiterId);
  if (!waiter) {
   return res.status(400).send({
    message: `Waiter by id ${waiterId} was not found`
   });
  }
 }

 // TODO: add check of order doc exists

 const update = {};

 if (waiterId !== undefined) {
  update.waiterId = waiterId;
 }

 if (orderId !== undefined) {
  update.orderId = orderId;
 }

 const doc = await Tables.findOneAndUpdate(
  { _id: mongoose.Types.ObjectId(_id) },
  { $set: update },
  { new: true }
 );

 return res.status(200).send(doc);
};