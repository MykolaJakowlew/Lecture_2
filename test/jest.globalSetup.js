require('dotenv').config({ path: './.env.test' });
const { mongoMemorySetup } = require("./mongo-db-memory");

module.exports = async () => {
  console.debug('Global setup was run');
  await mongoMemorySetup()
    .then(() => {
      console.debug(`mongo in memory done`);
    })
    .catch((err) => console.error(err));
};
