import React from 'react';
import { Home, Test } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainNav = () => {
  return (
    <Stack.Navigator headerMode="none" mode="modal" initialRouteName = 'home'>
      <Stack.Screen name="home" component={Home}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainNav;
