import React, { useContext, Component, useEffect, useState} from 'react';
import { StyleSheet,Text,ScrollView,SafeAreaView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, AuthProvider } from '../context';

export default (props) => {
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

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{userName}</Text>
                <TouchableOpacity 
                onPress = {goHome}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
    

    const styles = StyleSheet.create({









    })



}