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
    const [priceColor,setPriceColor] = useState("");
    const [photoHeight, setPhotoHeight] = useState("");
    const [photoWidth, setPhotoWidth] = useState("");

    const GOOGLE_API_KEY = "AIzaSyCxsMspiKy0P8mnXUlLgqhDC2Xowg86XuU";
    

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
            res = await axios.get(`http://192.168.1.201:3000/api/places/find`,{
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

        //console.log("I fired");
        return res.data;
    }

    // https://developers.google.com/maps/documentation/places/web-service/details

    const getPhoto = async function(pf,h,w) {
        if (token == null)
            throw("Missing token");
        if (email == null)
            throw("Missing email");

        // Try to get place from back-end server
        var res;
        try {
            // Returns a photo
            res = await axios({
                method: "get",
                responseType: "arraybuffer",
                url: "http://192.168.1.201:3000/api/places/photos/",
                params : {
                    photo_reference: pf,
                    maxwidth: w,
                    maxheight: h
                },
                headers: {
                    Authorization: "Bearer " + token,
                    email: email
                }
            })
        } catch (error) {
            console.log(`Failed get a photo: ${error}`);
            throw("Failed to get from back-end server getPhoto()")
        }
        console.log(res.data);
        setPhoto('data:image/jpeg;base64,' + res.data);
        console.log("I fired2");
        return res.data;
    }

    const setInfo = async function() {
/*
          try {
            var temp = places[0].price_level;
            if ( temp == "0") {
              setRestaurantPrice("Free");
              setPriceColor("#7CFC00");
            }
      
            if ( temp == "1") {
              setRestaurantPrice("Inexpensive ($)");
              setPriceColor("#32CD32");
            }
      
            if ( temp == "2") {
              setRestaurantPrice("Moderate ($$)");
              setPriceColor("#FFA500");
            }
      
            if ( temp == "3") {
              setRestaurantPrice("Expensive ($$$)");
              setPriceColor("#FF4500");
            }
      
            if ( temp == "4") {
              setRestaurantPrice("Very Expensive ($$$$)");
              setPriceColor("#DC143C");
            }
      
          } catch (error) {
            setRestaurantPrice("N/A");
          }
          */

          try {
        
            setPhoto('data:image/jpeg;base64,' + getPhoto(places[0].photos[0].photo_reference,places[0].photos[0].height,places[0].photos[0].width));
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log(photo);
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");


        
          } catch (error) {
              //setPhoto("https://wallpaperaccess.com/full/629233.jpg");
              setPhoto("https://previews.123rf.com/images/olenayepifanova/olenayepifanova1712/olenayepifanova171200041/92051683-set-of-vector-cartoon-doodle-icons-junk-food-illustration-of-comic-fast-food-seamless-texture-patter.jpg");
              
              console.log("\n");
              console.log("\n");
              console.log("\n");
              console.log("\n");
              console.log(error);
              console.log("\n");
              console.log("\n");

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
            priceColor,
            GOOGLE_API_KEY,
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
        setPriceColor,
        getPhoto,
        setInfo,
        
    }
    
    return <PlacesContext.Provider value={state}>{props.children}</PlacesContext.Provider>;
}

export { PlacesContext, PlacesProvider }