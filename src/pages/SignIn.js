// https://reactnative.dev/docs/components-and-apis
import React, { useState, useContext } from 'react';
import { View, PixelRatio, Dimensions, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext, AuthProvider } from '../context';

export default (props) => {
  App;
  const auth = useContext(AuthContext);
  //const {userName, password} = auth.state;
}

function get_font_size(size) {
  return size / PixelRatio.getFontScale();
};

const styles = StyleSheet.create({
  background_image: {
    flexGrow: 1,
    justifyContent: "flex-start",
    width: "100%",
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    flexDirection: "column",
  },
  menu_container: {
    width: "100%",
    padding: 4,
    display: "flex",
  },
  title: {
    fontSize: get_font_size(72),
    margin: 2,
    marginTop: "10%",
    marginBottom: "10%",
    color: "#66aaffff",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "bottom",
  },
  login_container: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4-4,
    paddingLeft: 4,
    backgroundColor: "#ffffff44",
  },
  input: {
    flexGrow: 1,
    width: "100%",
    fontSize: get_font_size(24),
    padding: 4,
    marginBottom: 4,
    backgroundColor: "#ffffffff",
  },
  signin: {
    fontSize: get_font_size(24),
    textAlign: "center",
    margin: 12,
    textAlignVertical: "center",
    color: "#ffffffff",
  },
  bar: {
    borderColor: "#ffffff44",
    width: "70%",
    alignSelf: "center",
    borderBottomWidth: 1,
  },
  signup: {
    fontSize: get_font_size(20),
    textAlign: "right",
    margin: 4,
    textAlignVertical: "top",
    color: "#ffffffff",
  }
});

const backgroundImage = {
  uri: "https://i.imgur.com/4SKbUmR.jpg",
};

function App(component) {
  const toSignUp = () => {
    component.navigation.navigate('sign up');
  };

  var username, password;
  const username_input_changed = (text) => {
    username = text
  }
  const password_input_changed = (text) => {
    password = text
  }

  const toLogin = async () => {
    console.log(username);
    console.log(password);
    console.log();

    try{
    const res = await auth.signIn(username, password);
    console.log('test?');
    Alert.alert('Authentication confirmed, welcome!'
    [{text:'Close', style:'default'}], 
        {cancelable:false})
        navigation.navigate('Home')
  } catch(err) {
    Alert.alert('Log in failed', 
    err.toString(),
    [{
      text: 'Ok',
      style: 'ok'
    }
  ],
  {cancelable:false}
  );
}
};
  

  return (
    <View style={styles.container}>
      <ImageBackground source = {backgroundImage} style = {styles.background_image}>
        <View style = {styles.menu_container}>
          <Text adjustsFontSizeToFit style = {styles.title}>
            Foodie
          </Text>
          <View style = {styles.login_container}>
            <TextInput onChangeText = {username_input_changed} style = {styles.input} placeholder = "Username" textContentType = "username" />
            <TextInput onChangeText = {password_input_changed} style = {styles.input} placeholder = "Password" textContentType = "password" secureTextEntry />
          </View>
          <TouchableOpacity>
            <Text style = {styles.signin} onPress = {toLogin}>
              Login
            </Text>
          </TouchableOpacity>
          <View style = {styles.bar} />
          <TouchableOpacity onPress = {toSignUp}>
            <Text style = {styles.signup}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};



