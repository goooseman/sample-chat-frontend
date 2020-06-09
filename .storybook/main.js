const webpackDevelopment = require("../configs/webpack/config.webpack.development");
const webpackProduction = require("../configs/webpack/config.webpack.production");
const webpackStorybook = require("../configs/webpack/config.webpack.storybook");

module.exports = {
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-storysource",
    "@storybook/addon-docs",
    "@storybook/addon-viewport/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-contexts/register",
  ],
  stories: ["../src/**/*.stories.(tsx|mdx)"],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    const customConfig =
      configType === "DEVELOPMENT" ? webpackDevelopment : webpackProduction;

    // https://storybook.js.org/docs/configurations/custom-webpack-config/#examples

    const finalConfig = webpackStorybook({
      ...customConfig,
      entry: config.entry,
      output: config.output,
      plugins: [...config.plugins, ...customConfig.plugins], // https://github.com/storybookjs/storybook/issues/6020
    });

    return finalConfig;
  },
};
