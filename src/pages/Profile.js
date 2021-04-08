import React, { useContext, Component, useEffect, useState, Suspense} from 'react';
import {StyleSheet,Text,ScrollView,SafeAreaView, TouchableOpacity, View, Modal, Pressable} from 'react-native';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, AuthProvider } from '../context';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { CommentContext, CommmentProvider } from "./../context/"
import { RestaurantContext, RestaurantProvider } from "./../context/"
import { FlatList, TextInput } from 'react-native-gesture-handler';


export default (props) => {

const commentContext = useContext(CommentContext);
const restaurantContext = useContext(RestaurantContext);

const width = useWindowDimensions.width;
const height = useWindowDimensions.height;
var [userName, setUserName] = useState("");
const [search, setSearch] = useState('');
const [filteredDataSource, setFilteredDataSource] = useState([]);
const [masterDataSource, setMasterDataSource] = useState([]);
var [comments, setComments] = useState([]);
var [restaurants, setRestaurants] = useState([]);
var [parent, setParent] = useState('');
const [modalVisible, setModalVisible] = useState(false);


    async function getMyData() {
        var username
    try{
        username = await AsyncStorage.getItem('userName');
        commentContext.setPoster(username);
        setUserName(username);
    }catch(error){
        console.log(`Failed to get username: ${error}`);
        throw("Failed to get auth username");
    }
    try{
        const mycomments = await commentContext.findComments(username);
        console.log(await commentContext.state.comments)
        setComments(mycomments);
    }catch(e){
        console.log(`No comments to load: ${e}`);
    }
    try{
        const myrestaurants = await restaurantContext.findRestaurant();
        console.log(myrestaurants);
        setRestaurants(myrestaurants);
        setMasterDataSource(myrestaurants);
        setFilteredDataSource(myrestaurants);

    }catch(e){
        console.log(`No restaurants to load: ${e}`);
    }
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

    useEffect( () =>{
        
        (async () => { 
            await getMyData()
        })();
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
        var count = 0
        try{
        for(let i=0; i < comments.data.length; i++){
           var newposter = comments.data[i].poster
            console.log(newposter);
           var newcontent = comments.data[i].content
            console.log(newcontent);
            count++
            newcomment = <View key = {count} style = {styles.basicview}><Text>{newposter}</Text>
                               <Text>{newcontent} {"\n"}</Text></View>

            commentlist.push(newcomment);
            //return newcomment;
        }
        // console.log(commentlist);
        // console.log(newcomment);
        return commentlist;
        console.log('comment list?' + commentlist);
        
       // console.log(content)
        //return content;
        }catch(error){
            console.log(`Failed to load poster/content: ${error}`);
            //throw('failed to load poster/content');
        }
       // console.log("comments" + comments.data.content)
      
       // return displaycomments.content;
    }
    
    const addComments = async function() {
        try{
            commentContext.addParentComment()
            getMyData();
        }catch(error){
            console.log(`Failed to add comment: ${error}`);
        }
    }


    const ItemView = ({ item }) => {
        return (
        // Flat List Item
        <Text style={styles.itemStyle} /*onPress={() => getItem(item)}*/>
            {item.id}
            {'.'}
            {item.name.toUpperCase()}
        </Text>
        );
  };

    const ItemSeparatorView = () => {
        return (
        // Flat List Item Separator
        <View
            style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
            }}
        />
        );
    };

    

    const searchFilterFunction  = (text) => {
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.data.filter(function (item) {
              const itemData = item.name
                ? item.name.toUpperCase()
                : ''.toUpperCase();
                console.log(itemData);
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            console.log(newData);
            setFilteredDataSource(newData);
            setSearch(text);
          } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
          }
    }

    const logOut = async () => {
        await AsyncStorage.removeItem('token')
        props.navigation.navigate('sign in')
    }


    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            padding: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        profileDetails: {
            alignItems: "center"
        },
        backButton: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            backgroundColor : 'pink',
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            //alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            alignContent: 'center'
          },
        buttonOpen: {
            backgroundColor: "#F194FF",
          },
        buttonClose: {
            backgroundColor: "#2196F3",
          },
        contentinput: {
            flexDirection: "column",
            alignContent: "center",
            maxHeight: 100,
            borderColor: "#1ca0ff", 
            borderWidth: 1, 
            padding: 10, 
            width: "75%",
        },
        basicview: {
            flex:1,
        },
        itemStyle: {
            padding: 10,
          },
    });

    return (
        <SafeAreaView style = {styles.screen}>
            <ScrollView>
                <View stlye = {styles.basicview}>
                    <Text>{userName}</Text>
                </View>
                    <View style = {styles.basicview}>{loadComments()}</View>
                <View>
                    <TouchableOpacity
                        onPress = {goHome}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
                <View>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}>
                    <View>
                    <View style={styles.modalView}>
                        <Text>Post a comment on your profile!</Text>
                            <SearchBar style = {styles.searchbar}
                            round
                            searchIcon={{ size: 18 }}
                            onChangeText={(text) => searchFilterFunction(text)}
                            onClear={(text) => searchFilterFunction('')}
                            placeholder = "find a restaurant"
                            value = {search}>
                            </SearchBar>
                                <FlatList 
                                data={filteredDataSource}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={ItemSeparatorView}
                                renderItem={ItemView}>
                                </FlatList>
                            <TextInput
                            multiline
                            onChangeText = {(text) => commentContext.setContent(text)}
                            style = {styles.contentinput} placeholder = "Write your comment here"
                            autoCapitalize = 'none' />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                            <Text>Go Back</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {addComments(); setModalVisible(!modalVisible);}}>
                            <Text>Add Comment</Text>
                            </Pressable>
                    </View>
                    </View>

                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen, styles.screen]}
                        onPress={() => setModalVisible(true)}>
                     <Text>Add a comment</Text>
                    </Pressable>
                     </View>

            </ScrollView>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style = {{backgroundColor:'grey', padding:'5%', borderRadius:'7%'}} onPress = {() => logOut()}>
                    <Text>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}