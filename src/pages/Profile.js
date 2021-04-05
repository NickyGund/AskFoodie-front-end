import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default (props) => {
 
    const logOut = async () => {
        props.navigation.navigate('sign in')
        await AsyncStorage.removeItem('token')
        
    }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style = {{backgroundColor:'grey', padding:'5%', borderRadius:'7%'}} onPress = {() => logOut()}>
            <Text>
                Sign Out
            </Text>
        </TouchableOpacity>
    </View>
  );
}