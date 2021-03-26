import React, {useState, useContext} from 'react';
import { View, PixelRatio, Dimensions, StyleSheet, ScrollView, Pressable, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FoodFilter from './FoodFilter'
import Filter from './filter'
import { AdminContext, PlacesProvider } from "./../context/"

const { width, height } = Dimensions.get('window');

export default (props) => {
    const adminContext = useContext(AdminContext);

    // const toComments = () => {
    //     props.navigation.navigate('comments')
    // }
 
    return (
        
        <View>
            <ScrollView showsVerticalScrollIndicator = {false} marginBottom = {'5%'}>
                {adminContext.state.restaurants.map((item,index) => {
                    return(
                        <TouchableOpacity key = {index}>
                            <Text>item.name</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )}

