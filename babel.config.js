module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // https://medium.com/swlh/how-to-properly-use-environment-variables-in-an-expo-react-native-app-7ab852590b30
    // reanimated
    // .env Variables paketet
    plugins: ["module:react-native-dotenv", "react-native-reanimated/plugin"],
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
