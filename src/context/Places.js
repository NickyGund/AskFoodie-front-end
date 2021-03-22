import axios from 'axios';
import React, { useState } from 'react';

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
            console.log(filters + ' ' + foodFilters)
            // Returns an array of dictionaries of places
            res = await axios.get(`http://10.0.0.6:3000/api/places/find`,{
                params : {
                    filters:filters,
                    foodFilters:foodFilters,
                    latitude:latitude,
                    longitude:longitude
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
    const getPlaceDetails = async function() {
        if (token == null)
            throw("Missing token");
        if (email == null)
            throw("Missing email");

        // Try to get place from back-end server
        var res;
        try {
            // Returns an array of dictionaries of places
            res = await axios({
                method: "get",
                url: "http://localhost:3000/api/places/info/",
                headers: {
                    Authorization: "Bearer " + token,
                    email: email
                }
            })
        } catch (error) {
            console.log(`Failed get a place: ${error}`);
            throw("Failed to get from back-end server")
        }
        
        setDetails(res.data);
        return res.data;
    }

    // const test  = (name) => {
    //     const newFilters = [...filters, name]
    //     setFilters(newFilters)

    //     console.log('Test ' + filters)
    // }

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
        getPlaceDetails,
        setFilters,
        setFoodFilters
        
    }
    
    return <PlacesContext.Provider value={state}>{props.children}</PlacesContext.Provider>;
}

export { PlacesContext, PlacesProvider }