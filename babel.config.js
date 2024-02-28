module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // https://medium.com/swlh/how-to-properly-use-environment-variables-in-an-expo-react-native-app-7ab852590b30
    plugins: ["module:react-native-dotenv"],
  };
};

/*

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
*/
