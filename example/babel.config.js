/* eslint-disable no-undef */
module.exports = function(api) {
  /* eslint-enable no-undef */
  api.cache(true);
  return {
    presets: ['babel-preset-expo']
  };
};
