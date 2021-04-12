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

    const [photo, setPhoto] = useState("");
    const [photo_reference, setPhoto_reference] = useState("");

    const [restaurantPhoneNumber,setRestaurantPhoneNumber] = useState("");
    const [restaurantName,setRestaurantName] = useState("");
    const [restaurantAddress,setRestaurantAddress] = useState("");
    const [restaurantType,setRestaurantType] = useState("");
    const [restaurantPrice,setRestaurantPrice] = useState("");
    const [restaurantRating,setRestaurantRating] = useState("");
    const [restaurantWebsite,setRestaurantWebsite] = useState("");
    const [googleRestaurantAddress,setGoogleRestaurantAddress] = useState("");

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
            res = await axios.get(`http://192.168.1.201:19000/api/places/find`,{
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

    const setInfo = async function() {

        try {
            setRestaurantPhoneNumber(details[0].formatted_phone_number);
          } catch (error) {
            setRestaurantPhoneNumber("N/A");
          }

          try {
            setRestaurantName(details[0].name);
          } catch (error) {
            setRestaurantName("N/A");
          }

          try {
            setRestaurantAddress(details[0].formatted_address);
          } catch (error) {
            setRestaurantAddress("N/A");
          }

          try {
            setRestaurantType(details[0].types[0]);
          } catch (error) {
            setRestaurantType("N/A");
          }

          try {
            var temp = places.details[0].price_level;
            if ( temp == 0) {
              setRestaurantPrice("Free");
            }
      
            if ( temp == 1) {
              setRestaurantPrice("Inexpensive ($)");
            }
      
            if ( temp == 2) {
              setRestaurantPrice("Moderate ($$)");
            }
      
            if ( temp == 3) {
              setRestaurantPrice("Expensive ($$$)");
            }
      
            if ( temp == 4) {
              setRestaurantPrice("Very Expensive ($$$$)");
            }
      
          } catch (error) {
            setRestaurantPrice("N/A");
          }

          try {
            setRestaurantRating(details[0].rating);
          } catch (error) {
            setRestaurantRating("N/A");
          }

          try {
            setRestaurantName(details[0].website);
          } catch (error) {
            setRestaurantName("N/A");
          }



    }
 

    const state = {
        state: {
            places,
            token,
            email,
            latitude,
            longitude,
            details,
            filters,
            foodFilters,
            photo,
            photo_reference,
            restaurantPhoneNumber,
            restaurantName,
            restaurantAddress,
            restaurantType,
            restaurantPrice,
            restaurantRating,
            restaurantWebsite,
            googleRestaurantAddress,
        },
        setPlaces,
        setToken,
        setEmail,
        setLatitude,
        setLongitude,
        setDetails,
        findPlace,
        setFilters,
        setFoodFilters,
        setPhoto,
        setPhoto_reference,
        setRestaurantPhoneNumber,
        setRestaurantName,
        setRestaurantAddress,
        setRestaurantType,
        setRestaurantPrice,
        setRestaurantRating,
        setRestaurantWebsite,
        setGoogleRestaurantAddress,
        
    }
    
    return <PlacesContext.Provider value={state}>{props.children}</PlacesContext.Provider>;
}

export { PlacesContext, PlacesProvider }