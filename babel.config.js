module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        'module-resolver',
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".json"],
          alias: {
            "@components": "./src/components",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@store": "./src/store",
            "@utils": "./src/utils",
          },
        },
      ],
      [
        "@babel/plugin-proposal-decorators",
        {
          legacy: true
        }
      ],
      ["functional-hmr"],
    ]
  };
};
