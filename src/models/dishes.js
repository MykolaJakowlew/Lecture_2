const { Schema, model } = require('mongoose');

const schema = new Schema({
 name: { type: String, required: true },
 price: { type: Number, required: true },
 isAvailable: { type: Boolean, default: true }
});

const Dishes = new model('dishes', schema, 'dishes');

module.exports = { Dishes };