import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-gesture-handler", () => {
  const mockGestureHandler = require("react-native-gesture-handler/jestSetup");
  return {
    ...mockGestureHandler,
    GestureHandlerRootView: ({ children }) => children,
  };
});

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");