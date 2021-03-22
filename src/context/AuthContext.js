import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const AuthContext = React.createContext();

const AuthProvider = props => {
  const [name,setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');

  const [birthdate, setDate] = useState(new Date());
  //const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const signUp = async () => {
    try {
      const res = await axios.post('http://10.0.0.6:3000/api/register', {
        email:email,
        firstName:name,
        userName:userName,
        birthdate,
        password
      });
      console.log(res.data)
      if (res.data.error) {
        console.log(res.data.data)
        throw new Error(res.data.data);
      }
      // await AsyncStorage.setItem('token', res.data.data.token)
      // setToken(res.data.token);
      // setLoggedIn(false);
      // setError(null);
      // setUserID(res.data.data.user.id);
      // await AsyncStorage.setItem('userId', res.data.data.user.id);
      // await AsyncStorage.setItem('userName', res.data.data.user.userName);
      // await AsyncStorage.setItem('email', res.data.data.user.email);
      return res.data;
    } catch (err) {
      setError(err.message);
      console.log(err.message)
      throw err;
    }
  };
  
  const signIn = async () => {
    try{
      // Send the email and password to login
      const res = await axios.post('http://10.0.0.6:3000/api/login', {
        email:email,
        password:password
      });

      // Output the result
      console.log(`Logged in as ${res.data.data.userName}`);

      if(res.data.error) { // If error, throw
        throw new Error(res.data.data);
      } else { // Else, set as logged in and store token
        setLoggedIn(true);
        await AsyncStorage.setItem('token', res.data.data.token);
        await AsyncStorage.setItem('userName', res.data.data.userName);
        await AsyncStorage.setItem('email', res.data.data.email);
        return res.data.data;
      }

    } catch (err) { // Output error
      setError(err.message);
      console.log(err.message)
      throw err;
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
      show
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
    setShow
  };

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
