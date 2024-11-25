import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const SwipableCard = () => {
  // Shared value for opacity
  const opacity = useSharedValue(0);

  // Animated style for fade-in
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // Trigger fade-in effect on mount
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 }); // Fade in over 1 second
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default SwipableCard;