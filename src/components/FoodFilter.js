import React, {useState} from 'react';
import { View, PixelRatio, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, Pressable, Text, ImageBackground } from 'react-native';
import Icon from './icon'
const { width, height } = Dimensions.get('window');

export default (props) => {

    const [pressed, setPressed] = useState(false)
    
    return (   
        <View style = {{justifyContent:'center', alignItems:'center',}}> 
            <TouchableOpacity 
                            style = {{alignItems:'center',justifyContent:'center'}} 
                            onPress = {() => setPressed(!pressed)}>
                <View style = {{...styles.image,backgroundColor:pressed ? '#e67373':'white', height:width*.2, width:width*.2}}>
                    <Icon name = {props.icon} size = {{height: height*.07 , width:height*.07}}/>
                </View>

                <Text style = {{color: pressed ? '#e67373': 'black'}}>{props.name}</Text>
            </TouchableOpacity>     
        </View>
    )}

    const styles = StyleSheet.create({

        image: {
            justifyContent:'center', 
            alignItems:'center',
            borderRadius:width*.2/2, 
            margin:10, 
        },
    })
      