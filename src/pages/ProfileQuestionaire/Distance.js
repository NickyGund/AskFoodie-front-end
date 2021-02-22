import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');


export default (props) => {
    const [distance, setDistance] = useState('')

    const submit = () => {
        // props.navigation.navigate('food');
        console.log('submit')
    }
  return (
    <View style = {{flex:1, alignItems:'center', paddingTop:50, backgroundColor:'white'}}>
        <View>
            <Text style = {{fontSize: 17}}>How far are you willing to typically travel?</Text>
        </View>
        <View style = {{flex:1}}>
        <Picker
            selectedValue={distance}
            style={{ height:50, width: width*.8, }}
            onValueChange={(itemValue, itemIndex) => setDistance(itemValue)}>
            <Picker.Item label="5 Miles" value="1" />
            <Picker.Item label="10 Miles" value="2" />
            <Picker.Item label="15 Miles" value="3" />
            <Picker.Item label="20 Miles" value="4" />
            <Picker.Item label="No Preference" value="5" />

            
        </Picker>
        </View>
        <View style = {{flex:2,}}>
        <TouchableOpacity 
            style = {{borderColor:'black', height:25, width:75, borderWidth:1, alignItems:'center', justifyContent:'center'}}
            onPress = {submit}
        >
            <Text>Submit</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

