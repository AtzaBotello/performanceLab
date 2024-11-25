import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
//import SwipableCard from './components/SwipeCard';

import SwipableCard from './components/SwipeCardReanimated';

import AnimatedList from './components/AnimatedList';

const App = () => {
  return (
    <SafeAreaView>
      <AnimatedList />
    </SafeAreaView>
  )
}

export default App;
