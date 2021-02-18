import React from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';

const { width, height } = Dimensions.get('window');
const cross = Math.sqrt(width * width + height * height);

export default (props) => {
  const toSignUp = () => {
    props.navigation.navigate('sign up');
  };
  return (
    <View style = {{flex:1, alignContent:'center', alignItems:'center', justifyContent:'center', backgroundColor: '#ADD8E6'}}>
      <TouchableOpacity onPress ={toSignUp} style={styles.appButtonContainer}>
        <Text style = {styles.appButtonText}>{'Sign up'} </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
