import React, { useContext, Component, useEffect, useState, Suspense} from 'react';
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

    async function getMyData() {
    var username
    try{
    username = await AsyncStorage.getItem('userName');
    }catch(error){
        console.log(`Failed to get username: ${error}`);
        throw("Failed to get auth username");
    }
    setUserName(username);
    commentContext.setPoster(username);
    var mycomments
    try{
        mycomments = await commentContext.findComments();
        
    }catch(e){
        console.log(`No comments to load: ${e}`);
        throw('failed to load comments');
    }
    setComments(mycomments);
    }    

   /* async function findComments() {
        var mycomments
        try{
            mycomments = await commentContext.findComments();
        }catch(e){
            console.log(`No comments to load: ${e}`);
            throw('failed to load comments');
        }
        setComments(mycomments);
    }*/

    useEffect(() =>{

       getMyData();
       console.log('UseEffect done..');
       //[] indicates that this is loads/unloads once and will not continuously update
    }, [])
    
    const goHome = function() {
        try{
            props.navigation.navigate('main');
        }
        catch(error){
            console.log(`Failed to go to main page: ${error}`);
            throw('failed to move');
        }
    }

    const loadComments = function() {
        var newcomment;
        var commentlist = [];
        try{
        for(let i=0; i <comments.data.length; i++){
            newposter = comments.data[i].poster
            console.log(newposter);
            newcontent = comments.data[i].content
            console.log(newcontent);
            newcomment = <View><Text>{newposter}</Text>
                               <Text>{newcontent} {"\n"}</Text></View>

            commentlist.push(newcomment);
            //return newcomment;
        }
        console.log(commentlist);
        console.log(newcomment);
        return commentlist;
        console.log('comment list?' + commentlist);
        
       // console.log(content)
        //return content;
        }catch(error){
            console.log(`Failed to load poster/content: ${error}`);
            //throw('failed to load poster/content');
        }
       // console.log("comments" + comments.data.content)
       // console.log("testeees" + comments.data.content);
      
       // return displaycomments.content;
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
                    <View><Text>{loadComments()}</Text></View>
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