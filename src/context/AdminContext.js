import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const AdminContext = React.createContext();

const AdminProvider = props => {
  const [restaurants, setRestaurants] = useState([])
  const [comments, setComments] = useState([])
  const [token, setToken] = useState("")

  useEffect(() => {
    (async () => {
      const getToken = await AsyncStorage.getItem('token');
      const getEmail = await AsyncStorage.getItem('email');
      setToken(getToken);
      setEmail(getEmail);
    })();
  },[]);

//   const getComments = async () => {
//     try {
//         const res = await axios.get(`http://10.0.0.6:3000/api/places/find`,{
//             params : {
//                 restaurant: ''
//             }, 
//             headers: {
//                 Authorization: "Bearer " + token,
//             }
              
//         })
//     }catch (error) {
//         throw("Failed to get Comments")
//     }  
// }

// const getRestaurants = async () => {
//     try {
//         const res = await axios.get(`http://10.0.0.6:3000/api/places/find`,{
//             headers: {
//                 Authorization: "Bearer " + token,
//             }
              
//         })
//     }catch (error) {
//         throw("Failed to get Comments")
//     }  
// }
  

  const state = {
    state: {
        restaurants,
        comments
    },
   
  };

  return <AdminContext.Provider value={state}>{props.children}</AdminContext.Provider>;
};

export { AdminContext, AdminProvider };
