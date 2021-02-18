import React, {useState} from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Text, TextInput , Platform, Button, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//INSTALL THIS
//expo install @react-native-community/datetimepicker
//const { width, height } = Dimensions.get('window');
//const cross = Math.sqrt(width * width + height * height);

export default () => {

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

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


  return (
    <View style = {/*{{flex:1, alignContent:'center', alignItems:'center', justifyContent:'center'}}*/ styles.container}>

      <Text style={styles.message }>Become a Foodie!</Text>

      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText} 
          placeholder = "Name.."
          placeholderTextColor = "#003f5c" />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText} 
          placeholder = "email.."
          placeholderTextColor = "#003f5c" />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText} 
          placeholder = "password.."
          placeholderTextColor = "#003f5c" />
      </View>
      <View style = {styles.inputView} >
        <TextInput 
          style={styles.inputText} 
          placeholder = "retype password.."
          placeholderTextColor = "#003f5c" />
      </View>


      <View>
        {/*<View  >*/}
          <TouchableOpacity
            onPress={showDatepicker}
 >
            <Text> Tap HERE to enter date of birth...</Text>
          </TouchableOpacity>
        {/*</View>*/}
        
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="defualt"
            onChange={onChange}
            maximumDate = {new Date()}
            minimumDate={new Date(1900, 1, 1)}
          />
          
        )}
      </View>



    </View>
  );
};


const styles = StyleSheet.create({

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