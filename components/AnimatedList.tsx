import React, { useMemo } from 'react';
import {
  FlatList,
} from 'react-native';

import AnimatedImage from './atoms/ItemList';

const generateImageData = () => {
    return Array.from({ length: 1000 }, (_, index) => ({
      id: `${index}`,
      uri: `https://via.placeholder.com/150?text=Image+${index + 1}`,
    }));
  };

const AnimatedList = () => {
    const data = useMemo(() => generateImageData(), []);
  
    const renderItem = ({ item }: { item: { id: string; uri: string }; }) => {
        return <AnimatedImage item={item} />
    };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      initialNumToRender={5}
      windowSize={2} 
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default AnimatedList;