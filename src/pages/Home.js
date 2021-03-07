import React from 'react';
import { View, PixelRatio, Dimensions, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import Filters from '../components/FoodFiltersList'
const { width, height } = Dimensions.get('window');

export default (props) => {
    
    
    
    const buttonClickedHandler = () => {
        console.log('You have been clicked a button!');
        // do something
      };

    
    
    
    return (
        
        <View style = {styles.screen}>
            <View style = {{flexDirection:'row', marginBottom:height*.1}}>
                <Filters/>
            </View>
            <View>
                <TouchableOpacity
                    onPress={buttonClickedHandler}
                    style={styles.roundButton1}>
                    <Text style={styles.buttonText }>Ask Foodie!</Text>
                </TouchableOpacity>
            </View>

        </View>
    )}

    const styles = StyleSheet.create({
   
        screen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'white'
        
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
