import React from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';

const { width, height } = Dimensions.get('window');
const cross = Math.sqrt(width * width + height * height);

export default (props) => {
  const toSignUp = () => {
    props.navigation.navigate('sign up');
  };
  return (
    <View style = {{flex:1, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
      <TouchableOpacity onPress ={toSignUp}>
        <Text> Go to sign Up</Text>
      </TouchableOpacity>
      
    </View>
  );
};
