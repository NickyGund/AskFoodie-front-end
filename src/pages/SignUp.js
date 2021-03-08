import React, {useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Text, TextInput , Platform, Button, TouchableOpacity, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext, AuthProvider } from '../context'
//INSTALL THIS
//expo install @react-native-community/datetimepicker
const { width, height } = Dimensions.get('window');
const cross = Math.sqrt(width * width + height * height);

export default (props) => {
  const auth = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const { email, password , name, userName, confirmPassword,birthdate} = auth.state;


  const createAccount = async () => {
    if (!passwordCheck()) return;
    try {
      if (!passwordCheck()) return;
      const res = await auth.signUp();
      Alert.alert(
        'Success', 'Account Created Successfully', 
        [{text:'Close', style:'default'}], 
        {cancelable:false})
        props.navigation.navigate('sign in')
    } catch (err) {
      Alert.alert(
        'Error',
        err.toString(),
        [
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ],
        { cancelable: false }
      );
    }
  };
  
  const passwordCheck = () => {
    if (password.length < 6) {
      setError('your passwords must be at least 6 characters');
      Alert.alert(
        'Error',
        error,
        [
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ],
        { cancelable: false }
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError('your passwords do not match');
      Alert.alert(
        'Error',
        error,
        [
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ],
        { cancelable: false }
      );
      return false;
    }
    setError(null);
    return true;
  };


  return (
    <View style = {styles.container}>

      <Text style={styles.message }>Become a Foodie!</Text>

      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText}
          value = {name} 
          placeholder = "Name.."
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setName(text)}
          autoCapitalize = 'none' />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText}
          value = {email} 
          placeholder = "email.."
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setEmail(text)}
          autoCapitalize = 'none'
           />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText} 
          value = {userName}
          placeholder = "username.."
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setUserName(text)}
          autoCapitalize = 'none'
           />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
        secureTextEntry={true}
          style={styles.inputText} 
          placeholder = "password.."
          value = {password}
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setPassword(text)}
          autoCapitalize = 'none'
           />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
        secureTextEntry={true}
          style={styles.inputText} 
          value = {confirmPassword}
          placeholder = "retype password.."
          placeholderTextColor = "#003f5c"
          onChangeText = {text => auth.setConfirmPassword(text)}
          autoCapitalize = 'none'
           />
      </View>


      
      <View style = {{ alignItems:'center'}}>
        <TouchableOpacity
          onPress = {() => setShow(!show)}
        >
          <Text style = {{color: 'white', fontWeight: 'bold'}} > Tap HERE to edit your date of birth...</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthdate}
            mode={'date'}
            is24Hour={true}
            onChange={(event, selected) => auth.setDate(selected)}
            maximumDate = {new Date()}
            minimumDate={new Date(1900, 1, 1)}
            style = {{height:height*.3,borderRadius:25, width: width*.75,}}
          />
        )}
      </View>


      <View>
        <TouchableOpacity onPress ={createAccount} style={styles.appButtonContainer}>
          <Text style = {styles.appButtonText}>{'next'} </Text>
        </TouchableOpacity>
      </View>

      
      <View>
        <TouchableOpacity onPress ={() => props.navigation.navigate('sign in')} style={styles.backButton}>
          <Text style = {styles.appButtonText}>{'Login'} </Text>
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
    width:width*.8,
    backgroundColor:"#465881",
    borderRadius:25,
    height:height*.5,
    justifyContent:"center",
    marginBottom:10,
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
    flexDirection:'row',
    color:"white"
  },

  set: {
    alignContent:'center',
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
