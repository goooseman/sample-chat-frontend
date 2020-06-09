/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

// This file does not exports a webpack configuration file, but exports a function, which customizes the configuration

module.exports = function (config) {
  // https://github.com/storybookjs/storybook/tree/master/addons/storysource#parser

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    exclude: [/node_modules/],
    loaders: [
      {
        loader: require.resolve("@storybook/source-loader"),
        options: { parser: "typescript" },
      },
    ],
    enforce: "pre",
  });

  // https://www.npmjs.com/package/react-docgen-typescript-loader
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: [/node_modules/],
    use: [
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          // Provide the path to your tsconfig.json so that your stories can
          // display types from outside each individual story.
          tsconfigPath: path.resolve(__dirname, "../../tsconfig.json"),
        },
      },
    ],
  });

  return config;
};
