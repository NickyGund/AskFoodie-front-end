import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AskFoodieContext = React.createContext();

const AskFoodieProvider = props => {
 const [filters, setFilters] = useState({})


 const submit = async () => {
     const body = {foodTypes, price, distance, dining}
     try {
         const res = await axios.post('http://localhost:3000/api/addProfileInfo', {
            foodTypes,
            price,
            distance,
            dining 
         }, { headers: { email: await AsyncStorage.getItem('email') } })
         console.log(res.data) 
     } catch (error) {
         console.log(error.message)
     }
    console.log(body)
 }

  const state = {
    state: {
      filters,
     

    },
    setFilters,

  };

  return <AskFoodieContext.Provider value={state}>{props.children}</AskFoodieContext.Provider>;
};

export { AskFoodieContext, AskFoodieProvider };
