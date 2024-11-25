import React, { useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipableCard = () => {
  const position = useRef(new Animated.ValueXY()).current;

  // PanResponder to handle gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: position.x, dy: position.y }, // Map gesture delta to position
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          // Swipe right
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH, y: 0 },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            position.setValue({ x: 0, y: 0 }); // Reset position (or handle removal)
          });
        } else if (gesture.dx < -120) {
          // Swipe left
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH, y: 0 },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            position.setValue({ x: 0, y: 0 }); // Reset position (or handle removal)
          });
        } else {
          // Return to original position
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              {
                rotate: position.x.interpolate({
                  inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                  outputRange: ['-15deg', '0deg', '15deg'],
                }),
              },
            ],
          },
        ]}
      />
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