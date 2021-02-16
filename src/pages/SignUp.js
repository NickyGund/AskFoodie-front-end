import React from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Text } from 'react-native';

const { width, height } = Dimensions.get('window');
const cross = Math.sqrt(width * width + height * height);

export default () => {
  return (
    <View style = {{flex:1, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
      <Text>Sign Up</Text>
    </View>
  );
};