import axios from 'axios';
import React, { useState } from 'react';

const PlacesContext = React.createContext()

const PlacesProvider = function(props) {
    const [places, setPlaces] = useState([]);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState({});
    const [photo, setPhoto] = useState("");
    const [photo_reference, setPhoto_reference] = useState("");

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
                url: "http://10.0.0.7:3000/api/places/find/",
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
                url: "http://10.0.0.7:3000/api/places/info/",
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


    const getPhoto = async function() {
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
                url: "http://10.0.0.7:3000/api/places/photos/",
                params : {
                    photo_reference: photo_reference
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
        
        setPhoto(res.data);
        return res.data;
    }

    const state = {
        state: {
            places,
            token,
            email,
            details,
            photo,
            photo_reference,
        },
        setPlaces,
        setToken,
        setEmail,
        setDetails,
        findPlace,
        getPlaceDetails,
        setPhoto,
        getPhoto,
        setPhoto_reference,
    }
    
    return <PlacesContext.Provider value={state}>{props.children}</PlacesContext.Provider>;
}

export { PlacesContext, PlacesProvider }