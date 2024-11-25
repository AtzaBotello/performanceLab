import Animated, { useAnimatedStyle, withDelay, withTiming } from 'react-native-reanimated';

// Custom hook for animated styles
const useFadeInAnimation = (index: number, animationTrigger: Animated.SharedValue<number>) => {
    return useAnimatedStyle(() => {
      const opacity = withDelay(index * 100, withTiming(animationTrigger.value, { duration: 500 }));
      return { opacity };
    });
};

export default useFadeInAnimation;