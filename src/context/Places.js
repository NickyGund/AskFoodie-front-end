import axios from 'axios';
import React, { useState } from 'react';

const PlacesContext = React.createContext()

const PlacesProvider = function(props) {
    const [places, setPlaces] = useState([]);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

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
            res = await axios({
                method: "get",
                url: `http://10.0.0.13:3000/api/places/find/${latitude}/${longitude}`,
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

    const state = {
        state: {
            places,
            token,
            email,
            latitude,
            longitude
        },
        setPlaces,
        setToken,
        setEmail,
        setLatitude,
        setLongitude,
        findPlace
    }
    
    return <PlacesContext.Provider value={state}>{props.children}</PlacesContext.Provider>;
}

export { PlacesContext, PlacesProvider }