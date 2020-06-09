/* eslint-disable @typescript-eslint/no-var-requires */
const commonConfig = require('./config.webpack.common');

module.exports = {
  ...commonConfig,
  mode: 'production',
};
