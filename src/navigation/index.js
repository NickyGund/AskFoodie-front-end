import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context';

import MainNav from './mainNav';
import { SignUp, SignIn, ProfileQuestionaire} from '../pages';
import RestaurantDisplay from '../pages/RestaurantDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default () => {
  const auth = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <>
      {/* {!loaded ? null : ( */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName='sign in' screenOptions={{ headerShown: false, gestureEnabled:false }}>
            <Stack.Screen name="restaurant display" component ={RestaurantDisplay} />
            <Stack.Screen name="questionaire" component={ProfileQuestionaire} />
            <Stack.Screen name="sign in" component={SignIn} />
            <Stack.Screen name="sign up" component={SignUp} />
            <Stack.Screen name="main" component={MainNav} />
          </Stack.Navigator>
        </NavigationContainer>
      {/*/)}*/}
    </>
  );
};
