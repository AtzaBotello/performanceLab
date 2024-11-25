import React, { useEffect } from 'react';
import { Image, StyleSheet, ViewStyle, ImageStyle, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface AnimatedImageProps {
  item: {
    id: string;
    uri: string;
  };
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({ item }) => {

    // Valor para triggerear la animacion
    const animationTrigger = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        const opacity = withDelay(10 * 100, withTiming(animationTrigger.value, { duration: 500 }));
        return { opacity };
    });
  
    // Activa la animacion cuando se monta el componente
    useEffect(() => {
      animationTrigger.value = 1;
    }, [animationTrigger]);

  return (
    <Animated.View style={[styles.imageContainer2, animatedStyle]}>
      <Image source={{ uri: item.uri }} style={styles.image2} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  } as ImageStyle,
  imageContainer2: {
    flex: 1,
    margin: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image2: {
    width: width / 2 - 20,
    height: width / 2 - 20,
    borderRadius: 8,
  },
});

export default AnimatedImage;