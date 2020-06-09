// This file does not exports a webpack configuration file, but exports a function, which customizes the configuration

module.exports = function (config) {
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve("@storybook/source-loader"),
        options: { parser: "typescript" },
      },
    ],
    enforce: "pre",
  });

  return config;
};
