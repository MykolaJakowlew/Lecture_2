const integrationConfig = require('./integration.config');
const baseConfig = require('./jest.config');

const rootDir = './src';

module.exports = {
 projects: [
  {
   ...baseConfig,
   rootDir,
  },
  {
   ...integrationConfig,
   rootDir,
  }
 ]
};