// process.env.MONGOMS_DEBUG = 1;
const { MongoMemoryServer } = require('mongodb-memory-server');
module.exports.mongoMemorySetup = async () => {
 const options = {
  auth: {
   disable: false,
   customRootName: process.env.MONGO_DB_LOGIN,
   customRootPwd: process.env.MONGO_DB_PASSWORD,
  }
 };

 // This will create an new instance of "MongoMemoryServer" and automatically start it
 const mongod = await MongoMemoryServer.create(options);
 global.__MONGOINSTANCE = mongod;

 const uri = mongod.getUri();

 process.env.MONGO_DB_URI = uri;
 console.log(`process.env.MONGO_DB_URI:${process.env.MONGO_DB_URI}`);
};

module.exports.mongoMemoryStop = async () => {
 // The Server can be stopped again with
 await global.__MONGOINSTANCE.stop();
};
