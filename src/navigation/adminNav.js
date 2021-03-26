import React from 'react';
import { Home, AdminHome, Comments } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AdminNav = () => {
  return (
    <Stack.Navigator headerMode="none" mode="modal" initialRouteName = 'adminHome'>
      <Stack.Screen name="adminHome" component={AdminHome}></Stack.Screen>
      <Stack.Screen name = "comments" component = {Comments}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AdminNav;
