import React, { useContext, Component, useEffect, useState} from 'react';
import {StyleSheet,Text,ScrollView,SafeAreaView, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, AuthProvider } from '../context';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { CommentContext, CommmentProvider } from "./../context/"


export default (props) => {

const width = useWindowDimensions.width;
const height = useWindowDimensions.height;
const commentContext = useContext(CommentContext);
var [userName, setUserName] = useState("");
var [comments, setComments] = useState([]);

    useEffect(() =>{

        async function getMyData() {
            try{
            userName = await AsyncStorage.getItem('userName');
            }catch(error){
                console.log(`Failed to get username: ${error}`);
                throw("Failed to get auth username");
            }
            setUserName(userName);
            commentContext.setPoster(userName);
        }
        async function findComments() {
            try{
                comments = await commentContext.findComments();
            }catch(e){
                console.log(`No comments to load: ${e}`);
                throw('failed to load comments');
            }
        }
       getMyData();
       findComments();
       console.log('UseEffect done..');
    }, [userName, comments])
    
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
            padding: 10,
            flexDirection: 'column',
        },
        profileDetails: {
            justifyContent: 'center'
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
                <View>
                    <Text>{userName}</Text>
                </View>

                <View>
                    <TouchableOpacity
                        onPress = {goHome}>
                    <Text>Back</Text>
                </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
    



}