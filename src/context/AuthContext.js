import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const AuthContext = React.createContext();

const AuthProvider = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');
  const [birthDate, setBirthDate] = useState(null);

  const signUp = async () => {
    try {
      const res = await axios.post('https://quoh.herokuapp.com/api/v1/auth/register', {
        email,
        userName,
        birthDate,
        password
      });
      if (res.data.error) {
        throw new Error(res.data.data);
      }
      await AsyncStorage.setItem('token', res.data.data.token);
      setToken(res.data.token);
      setLoggedIn(false);
      setError(null);
      setUserID(res.data.data.user.id);
      await AsyncStorage.setItem('userId', res.data.data.user.id);
      await AsyncStorage.setItem('userName', res.data.data.user.userName);
      await AsyncStorage.setItem('email', res.data.data.user.email);
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  

  const state = {
    state: {
      userName,
      password,
      email,
      error,
      confirmPassword,
      token,
      loggedIn,
      userID,
      birthDate
    },
    setUserName,
    setPassword,
    setEmail,
    setError,
    signUp,
    setConfirmPassword,
    setToken,
    setBirthDate,
  };

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
