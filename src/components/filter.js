// filter component for filters on home screen

import React, {useState, useContext} from 'react';
import { View, PixelRatio, Image, TouchableOpacity, useWindowDimensions, StyleSheet, ScrollView, Pressable, Text, ImageBackground } from 'react-native';
import Icon from './icon'
import { PlacesContext, PlacesProvider } from "./../context/"


export default (props) => {
    const placesContext = useContext(PlacesContext);
    const [pressed, setPressed] = useState(true)
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().width;
    const { filters } = placesContext.state
    
    // when filter is pressed adds that filter to the filters array
    const filterPressed = async (name) => {
        setPressed(!pressed)
        if(pressed){
            if(await filters.indexOf(props.name) < 0){ // add filter to array when pressed
                 await placesContext.setFilters(oldArray => [...oldArray, props.name])
            }
        } else { // remove filter from array if not pressed
            var newArray = filters
            var index = newArray.indexOf(props.name)
            newArray.splice(index,1)
            await placesContext.setFilters(newArray)
        }        
    }
    
    return ( // renders filter as a pressable button  
        <View style = {{justifyContent:'center', alignItems:'center',}}> 
            <TouchableOpacity 
                            style = {{margin:width*.05, justifyContent:'center', alignItems:'center', backgroundColor: !pressed ? 'black' : '#c9c9c9', borderRadius:100, padding:10}} 
                            onPress = {() => filterPressed(props.name)}>
                <Text style = {{color: !pressed ? 'white': 'black'}}>{props.name}</Text>
            </TouchableOpacity>     
        </View>
    )}

      