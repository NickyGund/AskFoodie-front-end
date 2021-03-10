import axios from 'axios';
import React, { useState } from 'react';

const getLonLatURL = "http://ip-api.com/json/";
const getMyIpURL = "http://ipv4bot.whatismyipaddress.com"

const LocationContext = React.createContext()

const LocationProvider = function(props) {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    async function getLocation() {
        var ip;
        try {
            ip = await axios({
                method: "get",
                url: getMyIpURL
            });
        } catch(error) {
            console.log(`Failed to get IP: ${error}`);
            throw("Failed to get IP");
        }
        ip = ip.data;
    
        // requests location with the client's ip address
        var locationData;
        try {
            locationData = await axios({
                method: "get",
                url: `${getLonLatURL}/${ip}`
            });
        } catch(error) {
            console.log(`Failed to get location: ${error}`);
            throw("Failed to get location");
        }
        locationData = locationData.data;
    
        if (locationData.status == "success") {
            setLatitude(locationData.lat);
            setLongitude(locationData.lon);
            return;
        } else {
            throw(locationData.message);
        }
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