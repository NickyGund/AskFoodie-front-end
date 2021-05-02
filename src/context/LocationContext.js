// global context to store and retrieve user location
import axios from 'axios';
import React, { useState } from 'react';
import * as Location from "expo-location"


const LocationContext = React.createContext()

const LocationProvider = function(props) {
    const [latitude, setLatitude] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined);

    // get user location
    async function getLocation(is_refresh) {
        if (!is_refresh && latitude != undefined && longitude != undefined)
            return;
    
        let status = await Location.requestPermissionsAsync();
        if (status != 'granted')
            return getLocationByIP()

        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);

        console.log(location.coords);
        return
    }

    const state = {
        state: {
            latitude,
            longitude
        },
        getLocation
    }
    
    return <LocationContext.Provider value={state}>{props.children}</LocationContext.Provider>;
}

export { LocationContext, LocationProvider }