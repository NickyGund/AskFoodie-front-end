import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, PixelRatio, Dimensions, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import { PlacesContext, PlacesProvider } from "./../context/";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
 
const { width, height } = Dimensions.get('window');

export default (props) => {
    const placesContext = useContext(PlacesContext);
    
    const buttonClickedHandler = async function() {
        // Try to get the token from the async storage
        var token;
        try {
            token = await AsyncStorage.getItem("token");
        } catch (error) {
            console.log(`Failed to get token: ${error}`);
            throw("Failed to get auth token");
        }
        placesContext.setToken(token);

        // Try to get the email from the async storage
        var email;
        try {
            email = await AsyncStorage.getItem('email');
        } catch (error) {
            console.log(`Failed to get email: ${error}`);
            throw("Failed to get email");
        }
        placesContext.setEmail(email);

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
    
   /* return (
        <View style = {styles.screen}>
            <TouchableOpacity
                onPress={buttonClickedHandler}
                style={styles.roundButton1}>
                <Text style={styles.buttonText }>Ask Foodie!</Text>
            </TouchableOpacity>
        </View>
    )*/
   
    return (
        <View style = {styles.screen}>
            <AwesomeButtonRick
            type='primary'
            onPress={buttonClickedHandler}
            stretch={false}
            height={width/3}
            width={width/2}
            textSize={10}
            textFamily="sans-seriff"
            raiseLevel={6}
            backgroundColor="red"
            backgroundDarker="#BF0000"> 
                
                <Text style={styles.buttonText}>Ask Foodie!</Text>
            </AwesomeButtonRick>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        },
        roundButton1: {
            
        },
        buttonText:{
            color:"white",
            fontSize:25,
            fontFamily: "Helvetica", 
            fontWeight:"bold",
        },

});
