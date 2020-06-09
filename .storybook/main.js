const webpackDevelopment = require("../configs/webpack/config.webpack.development");
const webpackProduction = require("../configs/webpack/config.webpack.production");

module.exports = {
  addons: ["@storybook/addon-actions/register"],
  stories: ["../src/**/*.stories.[tj]sx"],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    const customConfig =
      configType === "DEVELOPMENT" ? webpackDevelopment : webpackProduction;

    // https://storybook.js.org/docs/configurations/custom-webpack-config/#examples

    return {
      ...customConfig,
      entry: config.entry,
      output: config.output,
      plugins: [...config.plugins, ...customConfig.plugins], // https://github.com/storybookjs/storybook/issues/6020
    };
  },
};
