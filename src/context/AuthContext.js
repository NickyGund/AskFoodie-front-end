// global context to store user information and make user related api calls
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [birthdate, setDate] = useState(new Date());
  //const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // makes api call to create a new user in database
  const signUp = async () => {
    try {
      const res = await axios.post("http://192.168.1.246:3000/api/register", { // api call to create user with given information
        email: email,
        firstName: name,
        userName: userName,
        birthdate,
        password,
      });
      console.log(res.data);
      if (res.data.error) {
        console.log(res.data.data);
        throw new Error(res.data.data);
      }
      return res.data;
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      throw err;
    }
  };


  // checks if user has signed in and has a token. If token exists, return true, otherwise return false 
  const checkAuth = async () => {
    const tkn = await AsyncStorage.getItem("token");
    console.log(tkn);
    setToken(tkn)
    return (tkn ? true : false)
  };

  // make api call to sign in with given information
  const signIn = async () => {
    try {
      // Send the email and password to login
      const res = await axios.post("http://192.168.1.246:3000/api/login", {
        email: email,
        password: password,
      });

      if (res.data.error) {
        // If error, throw
        throw new Error(res.data.data);
      } else {
        // Else, set as logged in and store token, userName and email in Async Storage
        setLoggedIn(true);
        await AsyncStorage.setItem("token", res.data.data.token);
        await AsyncStorage.setItem("userName", res.data.data.userName);
        await AsyncStorage.setItem("email", res.data.data.email);
        return res.data.data;
      }
    } catch (err) {
      // Output error
      setError(err.message);
      console.log(err.message);
      throw err;
    }
  };

  // check if userName exists when signing up
  const checkUserName = async (value) => {
    try {
      // send entered userName and wait for response
      const res = await axios.get(
        `http://192.168.1.246:3000/api/check_username/${value}`
      );
      if (res.data.error) throw new Error(res.data.data);
      return res.data.exists; 
    } catch (err) { // throw error to catch statement to be displayed
      throw new Error(err);
    }
  };

  // check if email exists
  const checkEmail = async (value) => {
    try {
      // send entered email and await response
      const res = await axios.get(
        `http://192.168.1.246:3000/api/check_email/${value}`
      );
      if (res.data.error) throw new Error("bad email");
      return res.data.exists;
    } catch (err) {
      throw new Error(err);
    }
  };

  // get information for a given user
  const getUserInfo = async (user) => {
    try {
      res = await axios.get("http://192.168.1.246:3000/api/getUserInfo", {
        params: {
          userName: user,
        },
      });
      if (res.data.error) {
        throw new Error("bad username");
      }
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  };

  // get list of all users
  const findUsers = async () => {
    try {
      res = await axios.get("http://192.168.1.246:3000/api/findUsers", {
        params: {},
      });
      if (res.data.error) {
        throw new Error("error finding users");
      }
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  };

  // add a friend 
  const addFriend = async (user, friend) => {
    try {
      res = await axios.post("http://192.168.1.246:3000/api/addFriend", { // api call to add a friend in database
        userName: user,
        friends: friend,
      });
      if (res.data.error) {
        throw new Error("cant add friend");
      }
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const state = {
    state: {
      name,
      userName,
      password,
      email,
      error,
      confirmPassword,
      token,
      loggedIn,
      userID,
      birthdate,
      show,
    },
    setName,
    setUserName,
    setPassword,
    setEmail,
    setError,
    signUp,
    signIn,
    setConfirmPassword,
    setToken,
    setDate,
    setShow,
    checkAuth,
    checkEmail,
    checkUserName,
    getUserInfo,
    findUsers,
    addFriend,
  };

  return ( // syntax for react native context
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
