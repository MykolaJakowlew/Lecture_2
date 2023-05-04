const { mongoMemoryStop } = require("./mongo-db-memory");

module.exports = async () => {
 console.debug('globalTeardown was called');
 await mongoMemoryStop();
};