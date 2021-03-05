import React from 'react';
import { View, PixelRatio, Dimensions, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default (props) => {
    async function getPlace() {
        var textQuery = "bubble tea place"

        // Try to get the token from the async storage
        var token;
        try {
            token = await AsyncStorage.getItem("token")
        } catch (error) {
            console.log(`Failed to get token: ${error}`);
            Alert.alert(
                "Failed to get token",
                error
            );
            return props.navigation.navigate('sign in');
        }

        // Try to get place from back-end server
        var res;
        try {
            // Returns an array of dictionaries of places
            res = await axios({
                method: "get",
                url: "http://10.0.0.7:3000/api/places/find/",
                headers: {
                    Authorization: token
                },
                params: {
                    textQuery: textQuery
                }
            })
        } catch (error) {
            console.log(`Failed get a place: ${error}`);
            Alert.alert(
                "Failed to get a place",
                error
            );
            return;
        }

        if (res.data.length == 0) {
            console.log("No relevant places nearby");
            console.log(res.data);

            Alert.alert(
                "No places found",
                "No relevant places nearby"
            )
        } else {
            console.log("Successfully got a place from back-end server");
            console.log(res.data);

            Alert.alert(
                "We found you a place 😎",
                `${res.data[0].name} at ${res.data[0].formatted_address}`
            )
        }
        
        return;
    }

    return (
        <View style = {{flex:1,alignItems:'center', justifyContent: 'center'}}>
            <Text>Home</Text>
            <TouchableOpacity onPress = {getPlace}>
                <Text>
                    Test Foodie Button
                </Text>
            </TouchableOpacity>
        </View>
    )
}