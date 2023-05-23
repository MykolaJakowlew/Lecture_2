const { Dishes } = require('../../../models');

module.exports.createDish = async (req, res) => {
 const { name, price, isAvailable = true } = req.body;

 const dish = new Dishes({ price, isAvailable, name });
 const doc = await dish.save();

 return res.status(200).send(doc);
};