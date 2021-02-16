import React from 'react';
import { Home } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="home" component={Home}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainNav;
