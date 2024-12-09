module.exports = {
  preset: "react-native",
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-navigation|react-native|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-safe-area-context|@react-native|expo)/)",
  ],
};