import React, {useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Text, TextInput , Platform, Button, TouchableOpacity, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext, AuthProvider } from '../context/AuthContext'
//INSTALL THIS
//expo install @react-native-community/datetimepicker
//const { width, height } = Dimensions.get('window');
//const cross = Math.sqrt(width * width + height * height);

export default (props) => {

  const next = () => {

    
    if (!validateEmail(email)) {
      alert("Invalid email");
        return;
    } 

    //We have to check if the email is taken

    if (password != confirmPassword) {
      alert("Passwords do not match!");
        return;
    }
  
    props.navigation.navigate('sign in');
  

  };
  
  /*
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  */
 
 const auth = useContext(AuthContext);

 const { email, password, error, setError , show, name, username, confirmPassword, date} = auth.state;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    auth.setShow(Platform.OS === 'ios');
    auth.setDate(currentDate);
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  /*
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  */

  return (
    <View style = {/*{{flex:1, alignContent:'center', alignItems:'center', justifyContent:'center'}}*/ styles.container}>

      <Text style={styles.message }>Become a Foodie!</Text>

      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText} 
          placeholder = "Name.."
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setName(text)} />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText} 
          placeholder = "email.."
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setEmail(text)} />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText} 
          placeholder = "username.."
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setUserName(text)} />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
        secureTextEntry={true}
          style={styles.inputText} 
          placeholder = "password.."
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setPassword(text)} />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
        secureTextEntry={true}
          style={styles.inputText} 
          placeholder = "retype password.."
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setConfirmPassword(text)} />
      </View>


      
      <View>
        <TouchableOpacity
          //onPress={showDatepicker}
          onPress = {() => auth.setShow(!(auth.show))}
 >
          <Text style = {{color: 'white', fontWeight: 'bold'}} > Tap HERE to edit your date of birth...</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="defualt"
            onChange={onChange}
            maximumDate = {new Date()}
            minimumDate={new Date(1900, 1, 1)}
            style = {{height:30,borderRadius:25, width: 100,alignItems: 'center',justifyContent: 'center'}}
          />
        )}
      </View>


      <View>
        <TouchableOpacity onPress ={next} style={styles.appButtonContainer}>
          <Text style = {styles.appButtonText}>{'next'} </Text>
        </TouchableOpacity>
      </View>

      
      <View>
        <TouchableOpacity onPress ={next} style={styles.backButton}>
          <Text style = {styles.appButtonText}>{'cancel'} </Text>
        </TouchableOpacity>
      </View>


        

    </View>
  );
};


const styles = StyleSheet.create({

  backButton: {
    elevation: 8,
    backgroundColor: "#B22222",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 18,
    marginTop: 15
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  dateOne: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo:{
    fontWeight:"bold",
    fontSize:70,
    color:"#fb5b5a",
    marginBottom:40
  },

  message:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    alignContent:'center', 
    alignItems:'center',
  },

  inputView2:{
    width:"110%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    alignContent:'center', 
    alignItems:'center',
  },

  inputText:{
    height:50,
    color:"white"
  },

  set: {
    alignContent:'center',
    alignItems:'center',
    alignItems:'center',
    flex:1,
    backgroundColor: '#ADD8E6'
  },
  header: {
    fontSize: 20,
    color: '#fff',
    paddingBottom:10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: .7,
  },

  Textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: .7,
  }

});
