const mongoose = require('mongoose');
const { Tables } = require('../../../models');

const handler = (update) => {
  return async (req, res) => {
    const { _id } = req.params;

    const table = await Tables.findOne({ _id: new mongoose.Types.ObjectId(_id) });
    if (!table) {
      return res.status(400)
        .send({ message: `Table with _id ${_id} was not found` });
    }

    const doc = await Tables.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      { $set: update },
      { new: true }
    );

    return res.status(200).send(doc);
  };
};

module.exports.deleteOrder = handler({ orderId: null });

module.exports.deleteWaiter = handler({ waiterId: null });