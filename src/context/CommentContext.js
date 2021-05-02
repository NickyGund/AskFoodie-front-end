// global context to store comments and make api calls to add and find comments

import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CommentContext = React.createContext();

const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);
  const [poster, setPoster] = useState("");
  const [type, setType] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [content, setContent] = useState("");
  const [parent, setParent] = useState("");
  const [error, setError] = useState(null);


  // add a comment for a given restaurant
  const addParentComment = async () => {
    //const body = {poster, restaurant, content}
    try {
      // api call to add a comment for a given restaurant by given user
      const res = await axios.post(
        "http://192.168.1.246:3000/api/addParentComment",
        {
          poster: poster,
          restaurant: restaurant,
          content: content,
        }
      );
      console.log(res.data);
      if (res.data.error) {
        console.log(res.data.data);
        throw new Error(res.data.data);
      }
      setPoster(res.data.data.poster);
      setRestaurant(res.data.data.restaurant);
      setContent(res.data.data.content);
      return res.data;
    } catch (err) {
      setError(error.message);
      console.log(error.message);
    }
    console.log(body);
  };

  // retrieve comments for a given user
  const findComments = async (user) => {
    var res;
    try {
      res = await axios.get("http:/192.168.1.246:3000/api/findComments", {
        params: {
          poster: user,
        },
      });
    } catch (error) {
      console.log(`Failed get comments: ${error}`);
      throw "Failed to get from back-end server";
    }
    setComments(res.data);
    console.log(res.data);
    return res.data;
  };


  const state = {
    state: {
      type,
      poster,
      restaurant,
      content,
      parent,
    },
    setType,
    setPoster,
    setRestaurant,
    setContent,
    setParent,
    addParentComment,
    findComments,
  };
  return (
    <CommentContext.Provider value={state}>
      {props.children}
    </CommentContext.Provider>
  );
};
export { CommentContext, CommentProvider };
