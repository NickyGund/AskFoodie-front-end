import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

async function findPlace(textQuery) {
    // Try to get the token from the async storage
    var token;
    try {
        token = await AsyncStorage.getItem("token")
    } catch (error) {
        console.log(`Failed to get token: ${error}`);
        throw("Failed to get auth token");
    }

    // Try to get place from back-end server
    var res;
    try {
        // Returns an array of dictionaries of places
        res = await axios({
            method: "get",
            url: "http://10.0.0.7:3000/api/places/find/",
            headers: {
                Authorization: "Bearer " + token,
                email: await AsyncStorage.getItem('email')
            }
        })
    } catch (error) {
        console.log(`Failed get a place: ${error}`);
        throw("Failed to get from back-end server")
    }
    
    return res.data;
}

async function getPlaceDetails() {
    return {};
}

export { findPlace, getPlaceDetails }