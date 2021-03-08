import React, {useState} from 'react';
import { View, PixelRatio, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, Pressable, Text, ImageBackground } from 'react-native';
import Icon from './icon'
const { width, height } = Dimensions.get('window');

export default (props) => {

    const [pressed, setPressed] = useState(false)
    
    return (   
        <View style = {{justifyContent:'center', alignItems:'center',}}> 
            <TouchableOpacity 
                            style = {{margin:width*.05, justifyContent:'center', alignItems:'center', backgroundColor: pressed ? 'black' : '#c9c9c9', borderRadius:100, padding:10}} 
                            onPress = {() => setPressed(!pressed)}>
                <Text style = {{color: pressed ? 'white': 'black'}}>{props.name}</Text>
            </TouchableOpacity>     
        </View>
    )}

      