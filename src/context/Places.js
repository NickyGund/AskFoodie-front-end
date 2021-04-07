import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

const PlacesContext = React.createContext()

const PlacesProvider = function(props) {
    const [places, setPlaces] = useState([]);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [details, setDetails] = useState({});
    const [foodFilters, setFoodFilters] = useState([])
    const [filters, setFilters] = useState([])

    // https://developers.google.com/maps/documentation/places/web-service/search#nearby-search-and-text-search-responses


    const findPlace = async function() {
        if (token == "")
            throw("Missing token");
        if (email == "")
            throw("Missing email");

        // Try to get place from back-end server
        var res;
        try {
            // Returns an array of dictionaries of places
            res = await axios.get(`http://192.168.1.26:3000/api/places/find`,{
                params : {
                    latitude:latitude,
                    longitude:longitude,
                    filters:JSON.stringify(filters),
                    foodFilters:JSON.stringify(foodFilters)
                }, 
                headers: {
                    Authorization: "Bearer " + token,
                    email: email
                }
                  
            })
        } catch (error) {
            console.log(`Failed get a place: ${error}`);
            throw("Failed to get from back-end server")
        }
        
        setPlaces(res.data);
        return res.data;
    }

    // https://developers.google.com/maps/documentation/places/web-service/details
    

 

    const state = {
        state: {
            places,
            token,
            email,
            latitude,
            longitude,
            details,
            filters,
            foodFilters
        },
        setPlaces,
        setToken,
        setEmail,
        setLatitude,
        setLongitude,
        setDetails,
        findPlace,
        setFilters,
        setFoodFilters
        
    }
    
    return <PlacesContext.Provider value={state}>{props.children}</PlacesContext.Provider>;
}

export { PlacesContext, PlacesProvider }