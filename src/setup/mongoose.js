const mongoose = require('mongoose');

module.exports = async () => {
 switch (process.env.MONGO_DB_AUTH) {
  case 'link': {
   await mongoose.connect(process.env.MONGO_DB_URI);
   break;
  }
  case 'login': {
   await mongoose.connect(process.env.MONGO_DB_URI, {
    auth: {
     username: process.env.MONGO_DB_LOGIN,
     password: process.env.MONGO_DB_PASSWORD,
    }
   });
   break;
  }
  default: {
   throw new Error(`Can not to connection to mongoDB by MONGO_DB_AUTH:${process.env.MONGO_DB_AUTH}`);
  }
 }
};