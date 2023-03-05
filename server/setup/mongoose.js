const mongoose = require('mongoose');

const setupDb = async () => {
 await mongoose.connect(process.env.MONGO_DB_URI);
};

module.exports = { setupDb };