import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, PixelRatio, Dimensions, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert, useWindowDimensions } from 'react-native';
import { PlacesContext, PlacesProvider, LocationContext } from "./../context/"
import Filters from '../components/FoodFiltersList'

export default (props) => {
    const placesContext = useContext(PlacesContext);
    const locationContext = useContext(LocationContext);
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().width;

    // Function is called when Home.js is rendered
    useEffect(function() {
        //get token
         AsyncStorage.getItem('token')
         .then(placesContext.setToken)
         .catch(function(error) {
            console.log(`Failed to get token: ${error}`);
            Alert.alert(
                "Failed to get token",
                error
            );
            return;
        })
        
        // Get the location
        locationContext.getLocation(false)
        .then(function() {
            placesContext.setLatitude(locationContext.state.latitude);
            placesContext.setLongitude(locationContext.state.longitude);

            // Get the email
            AsyncStorage.getItem('email')
            .then(placesContext.setEmail)
            .catch(function(error) {
                console.log(`Failed to get email: ${error}`);
                Alert.alert(
                    "Failed to get your email",
                    error
                );
                return;
            })
        }).catch(function(error) {
            console.log(`Failed to get location: ${error}`);
            Alert.alert(
                "Failed to get your location",
                error
            );
            return;
        })
    });


    const buttonClickedHandler = async function() {
        // Try to get the token from the async storage
        // Try to find places given the query
        // It returns an array of places
        var places;
        try {
            places = await placesContext.findPlace();
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
            console.log(places);
    
            Alert.alert(
                "No places found",
                "No relevant places"
            );
        } else { // Atleast 1 place was found
            console.log(`Successfully got ${places.length} place(s) from back-end server`);
            console.log(places);
    
            Alert.alert(
                "We found you a place 😎",
                `${places[0].name}\n${places[0].vicinity}`
            );
        }
        return;
    }

    const styles = StyleSheet.create({
   
        screen: {
            flex: 1,
            paddingVertical:height*.15,
            alignItems: 'center',
            backgroundColor:'white',
          },

          roundButton1: {
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 100,
            backgroundColor: "red",
            
          },
          buttonText:{
             color:"white",
             fontSize:20,
             fontWeight:"bold",
          },

});
    
    return (
        <View style = {styles.screen}>
            <View style = {{flexDirection:'row', }}>
                <Filters/>
            </View>
            <View style = {{flex:1, justifyContent:'center'}}>
                <TouchableOpacity
                    onPress={buttonClickedHandler}
                    style={styles.roundButton1}>
                    <Text style={styles.buttonText }>Ask Foodie!</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

    
