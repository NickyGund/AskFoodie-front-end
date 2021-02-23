import React, { useState, useContext } from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { ProfileQuestionaireContext } from '../../context'
const { width, height } = Dimensions.get('window');


export default (props) => {
    const questionaire = useContext(ProfileQuestionaireContext)
    const [price, setPrice] = useState('')

    const toFoodQuestion = async () => {
        // await questionaire.setPrice(price)
        props.navigation.navigate('food');
    }
  return (
    <View style = {{flex:1, alignItems:'center', paddingTop:50, backgroundColor:'white'}}>
        <View>
            <Text style = {{fontSize: 17}}>How much do you typically spend when you eat out?</Text>
        </View>
        <View style = {{flex:1}}>
        <Picker
            selectedValue={questionaire.state.price}
            style={{ height:50, width: width*.8, }}
            onValueChange={async (itemValue, itemIndex) => await questionaire.setPrice(itemValue)}>
            <Picker.Item label="No Preference" value="none" />
            <Picker.Item label="$" value="$" />
            <Picker.Item label="$$" value="$$" />
            <Picker.Item label="$$$" value="$$$" />
            <Picker.Item label="$$$$" value="$$$$" />

            
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

