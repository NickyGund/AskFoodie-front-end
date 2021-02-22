import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileQuestionaireContext = React.createContext();

const ProfileProvider = props => {
 const [foodTypes, setFoodTypes] = useState([])
 const [price, setPrice] = useState('')

 const submit = async () => {
     try {
         const res = await axios.post('', {
            foodTypes,
            price 
         }) 
     } catch (error) {
         console.log(error.message)
     }
 }

  const state = {
    state: {
      foodTypes,
      price

    },
    setFoodTypes,
    setPrice,
    submit

  };

  return <ProfileQuestionaireContext.Provider value={state}>{props.children}</ProfileQuestionaireContext.Provider>;
};

export { ProfileQuestionaireContext, ProfileProvider };
