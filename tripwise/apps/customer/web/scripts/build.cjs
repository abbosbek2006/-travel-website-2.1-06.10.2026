// Run the standard React build with fresh compiler and lint results.
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
const configuration = require.resolve('react-scripts/config/webpack.config');
const factory = require(configuration);
require.cache[configuration].exports = environment => {
  const config = factory(environment);
  config.cache = false;
  for (const plugin of config.plugins) {
    if (plugin.constructor.name === 'ESLintWebpackPlugin') plugin.options.cache = false;
  }
  return config;
};
require('react-scripts/scripts/build');