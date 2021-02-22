import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');


export default (props) => {
    const [type, setType] = useState('')

    const toDistanceQuestion = () => {
        props.navigation.navigate('distance');
    }
  return (
    <View style = {{flex:1, alignItems:'center', paddingTop:50, backgroundColor:'white'}}>
        <View>
            <Text style = {{fontSize: 17}}>Do you prefer dining in or taking out?</Text>
        </View>
        <View style = {{flex:1}}>
        <Picker
            selectedValue={type}
            style={{ height:50, width: width*.8, }}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
            <Picker.Item label="Dine In" value='1' />
            <Picker.Item label="Take Out" value="2" />
            <Picker.Item label="No Preference" value='3' />

            
        </Picker>
        </View>
        <View style = {{flex:2,}}>
        <TouchableOpacity 
            style = {{borderColor:'black', height:25, width:75, borderWidth:1, alignItems:'center', justifyContent:'center'}}
            onPress = {toDistanceQuestion}
        >
            <Text>Next</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

