import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

const AdminContext = React.createContext();

const AdminProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState("");

  const getComments = async (id) => {
    const commentsList = [
      {
        id: 1,
        poster: "Ben",
        content:
          "letter words starting with “B” and not ending in “E”. Next I get “M” using the assumption that “From” is in the text. “W” is obtained by finding four letter words ending in “Ith” and assuming the most common word out of that list is “With”. Next I get “C” either with the word “Can” or “Which”, assuming one or both is in the text. Then I get “G” by finding all words that end in “in-” and the last letter is one that has not been found yet. This presumably gives all words ending in “ing”. Next “L",
      },
      { id: 2, poster: "joe", content: "This place is bad!" },
    ];
    setComments(commentsList);
    console.log(id);
    var res;
    try {
      res = await axios.get(
        "http://192.168.1.201:3000/api/findCommentsForRestaurant",
        {
          params: {
            restaurant: id,
          },
        }
      );
    } catch (error) {
      console.log(`Failed get comments: ${error}`);
      throw "Failed to get from back-end server";
    }
    console.log(res.data);
    //setComments(res.data.data);
    return res.data;
  };

  const getRestaurants = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.201:3000/api/findRestaurant`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res.data.data);
      setRestaurants(res.data.data);
    } catch (error) {
      throw "Failed to get restaurants";
    }
  };

  const deleteComment = async (id) => {
    var res;
    try {
      res = await axios.get("http://192.168.1.201:3000/api/deleteComment", {
        params: {
          id: id,
        },
      });
      var filtered = comments.filter(function (value, index, arr) {
        return value._id != id;
      });
      setComments(filtered);
    } catch (error) {
      console.log(`Failed get comments: ${error}`);
      throw "Failed to delete comment";
    }
  };

  const state = {
    state: {
      restaurants,
      comments,
    },
    setComments,
    setRestaurants,
    getComments,
    getRestaurants,
    deleteComment,
  };

  return (
    <AdminContext.Provider value={state}>
      {props.children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
