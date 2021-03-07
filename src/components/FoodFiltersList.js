import React, {useState} from 'react';
import { View, PixelRatio, Dimensions, StyleSheet, ScrollView, Pressable, Text, ImageBackground } from 'react-native';
import Filter from './filter'
const { width, height } = Dimensions.get('window');

export default (props) => {

    const foodTypes = [
        {name:'Fast Food', icon:'FastFood'}, 
        {name:'Burgers', icon:'Burgers'}, 
        {name:'Mexican', icon:'Mexican'},
        {name:'Breakfast', icon:'Breakfast'},
        {name:'Sandwhiches', icon:'Sandwhiches'},
        {name:'Dessert', icon:'Dessert'},
        {name:'Healthy', icon:'Healthy'},
        {name:'Japanese', icon:'Japanese'},
        {name:'Chinese', icon:'Chinese'},
        {name:'Sushi', icon:'Sushi'},
        {name:'Pizza', icon:'Pizza'},
        {name:'Vegan', icon:'Vegan'},
        {name:'Italian', icon:'Italian'},
        {name:'Asian', icon:'Asian'}
        ]
    
    return (
        
        <View>
            <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
                {foodTypes.map((item,index) => {
                    return(
                        <View key = {index} >
                            <Filter icon = {item.icon} name = {item.name}/>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )}

    const styles = StyleSheet.create({
   
        screen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        
          },
          roundButton1: {
        
            marginBottom: height/3,
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 100,
            backgroundColor: "red",
            
          },
          buttonText:{
             color:"white",
             fontSize:20,
             fontWeight:"bold",
          },
    
    });
