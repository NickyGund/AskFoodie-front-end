import React from 'react';
import { View, PixelRatio, Dimensions, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert} from 'react-native';
import { findPlace, getPlaceDetails} from "../context/Places";

export default (props) => {
    const requestPlace = async function() {
        var textQuery = "bubble tea place"; // Temporary

        // Try to find places given the query
        // It returns an array of places, but I havent seen it return more than one before, so I'll assume it's max 1 place for now
        var places;
        try {
            places = await findPlace(textQuery);
        } catch(error) {
            console.log(`Failed to find a place: ${error}`);
            Alert.alert(
                "Failed to find a place",
                error
            );
            return;
        }

        // No relevant places found
        if (places.length == 0) {
            console.log("No relevant places");
            console.log(res.data);
    
            Alert.alert(
                "No places found",
                "No relevant places"
            );
        } else { // Atleast 1 place was found
            console.log("Successfully got a place from back-end server");
            console.log(places);
    
            Alert.alert(
                "We found you a place 😎",
                `${places[0].name}\n${places[0].formatted_address}`
            );
        }
        return;
    }

    return (
        <View style = {{flex:1,alignItems:'center', justifyContent: 'center'}}>
            <Text>Home</Text>
            <TouchableOpacity onPress = {requestPlace}>
                <Text>
                    Test Foodie Button
                </Text>
            </TouchableOpacity>
        </View>
    )
}