import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const AdminContext = React.createContext();

const AdminProvider = props => {
  const [restaurants, setRestaurants] = useState([])
  const [comments, setComments] = useState([])
  const [token, setToken] = useState("")

  // useEffect(() => {
  //   (async () => {
  //     const getToken = await AsyncStorage.getItem('token');
  //     const getEmail = await AsyncStorage.getItem('email');
  //     setToken(getToken);
  //     setEmail(getEmail);
  //   })();
  // },[]);

  const getComments = async () => {
    const commentsList = [{id: 1, userName: 'Ben', comment:"letter words starting with “B” and not ending in “E”. Next I get “M” using the assumption that “From” is in the text. “W” is obtained by finding four letter words ending in “Ith” and assuming the most common word out of that list is “With”. Next I get “C” either with the word “Can” or “Which”, assuming one or both is in the text. Then I get “G” by finding all words that end in “in-” and the last letter is one that has not been found yet. This presumably gives all words ending in “ing”. Next “L"}, {id:2, userName: 'joe', comment:"This place is bad!"}]
    setComments(commentsList)
    // try {
    //     const res = await axios.get(`http://10.0.0.6:3000/api/places/find`,{
    //         params : {
    //             restaurant: ''
    //         }, 
    //         headers: {
    //             Authorization: "Bearer " + token,
    //         }
              
    //     })
    // }catch (error) {
    //     throw("Failed to get Comments")
    // }  
}

const getRestaurants = async () => {

  const restaurantsList = [{name: "Mei-Mei Chinese Take-Out"}, 
                          {name:"Kam Fung Chinese Restaurant"}, 
                          {name:"Yue Wah Kitchen" },
                          {name: "Mei-Mei Chinese Take-Out"},
                          {name: "Mei-Mei Chinese Take-Out"},
                          {name: "Mei-Mei Chinese Take-Out"},
                          {name: "Mei-Mei Chinese Take-Out"},
                          {name: "Mei-Mei Chinese Take-Out"},
                          {name: "Mei-Mei Chinese Take-Out"},
                          {name: "Mei-Mei Chinese Take-Out"},
                          {name: "Mei-Mei Chinese Take-Out"},
                        ]
  setRestaurants(restaurantsList)
    // try {
    //     const res = await axios.get(`http://10.0.0.6:3000/api/places/find`,{
    //         headers: {
    //             Authorization: "Bearer " + token,
    //         }
              
    //     })
    // }catch (error) {
    //     throw("Failed to get Comments")
    // }  
}

const deleteComment = async (id) => {
  var filtered = comments.filter(function(value, index, arr){ 
    return value.id != id;
  });
  setComments(filtered)
}
  

  const state = {
    state: {
        restaurants,
        comments
    },
    setComments,
    setRestaurants,
    getComments,
    getRestaurants,
    deleteComment
   
  };

  return <AdminContext.Provider value={state}>{props.children}</AdminContext.Provider>;
};

export { AdminContext, AdminProvider };
