import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');


export default (props) => {
    const [language, setLanguage] = useState('')

    const toFoodQuestion = () => {
        props.navigation.navigate('food');
    }
  return (
    <View style = {{flex:1, alignItems:'center', paddingTop:50, backgroundColor:'white'}}>
        <View>
            <Text style = {{fontSize: 17}}>How much do you typically spend when you eat out?</Text>
        </View>
        <View style = {{flex:1}}>
        <Picker
            selectedValue={language}
            style={{ height:50, width: width*.8, }}
            onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}>
            <Picker.Item label="$" value="$" />
            <Picker.Item label="$$" value="$$" />
            <Picker.Item label="$$$" value="$$$" />
            <Picker.Item label="$$$$" value="$$$$" />
            <Picker.Item label="No Preference" value="none" />

            
        </Picker>
        </View>
        <View style = {{flex:2,}}>
        <TouchableOpacity 
            style = {{borderColor:'black', height:25, width:75, borderWidth:1, alignItems:'center', justifyContent:'center'}}
            onPress = {toFoodQuestion}
        >
            <Text>Next</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

