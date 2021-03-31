import React, { useContext, Component, useEffect, useState} from 'react';
import {StyleSheet,Text,ScrollView,SafeAreaView, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, AuthProvider } from '../context';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

export default (props) => {
const width = useWindowDimensions.width;
const height = useWindowDimensions.height;
const authContext = useContext(AuthContext);
var [userName, setUserName] = useState("");

    useEffect(() =>{

        async function getMyData() {
            userName = await AsyncStorage.getItem('userName');
            console.log(userName);
            setUserName(userName);
            authContext.setUserName(userName);
            return;
        }
       getMyData();
       console.log('UseEffect done..');
    }, [userName])
    
    const goHome = function() {
        try{
            props.navigation.navigate('main');
        }
        catch(error){
            console.log(`Failed to go to main page: ${error}`);
            throw('failed to move');
        }
    }

    const styles = StyleSheet.create({
        screen: {
            flex: 1,
        },
       
        backButton: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            backgroundColor : 'pink',

        },
 
    });


    return (
        <SafeAreaView>
            <ScrollView>
                <View style = {styles.screen}>
                <Text>{userName}</Text>
                </View>
                <View style = {styles.screen}>
                <TouchableOpacity style = {styles.backButton}
                onPress = {goHome}>
                    <Text>Back</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    



}