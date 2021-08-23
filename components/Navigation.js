import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Options from './Options';

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator 
  // haderMode="none" 
  // initialRouteName="Options"
  >
    <MainStack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <MainStack.Screen name="Options" component={Options} />
  </MainStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <MainStackScreen />
  </NavigationContainer>
);