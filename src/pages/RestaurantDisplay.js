import React, {useState, useContext, useEffect, Component } from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Text, TextInput , Platform, Button, TouchableOpacity, Alert, Image, Animated, Linking, ImageBackground} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext, AuthProvider } from '../context';
import logo from '../images/ru.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import openMap from 'react-native-open-maps';

import { PlacesContext, PlacesProvider } from '../context/Places';




class ImageLoader extends Component {
    state = {
      opacity: new Animated.Value(0),
    }
  
    onLoad = () => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  
    render() {
      return (
        <Animated.Image
          onLoad={this.onLoad}
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            },
            this.props.style,
          ]}
        />
      );
    }
  }

  const restaurantPhoneNumber = "";
  const restaurantName = "";
  const restaurantAddress = "";
  const restaurantType = "";
  const restaurantPrice = "";
  const restaurantRating = "";
  const restaurantWebsite = "";
  const googleRestaurantAddress = "";

  const getRestaurantPhoneNumber = async () => {
    try {
      restaurantPhoneNumber = places.details[0].formatted_phone_number;
    } catch (error) {
      restaurantPhoneNumber = "N/A";
    }
  }

  const getRestaurantName = async () => {
    try {
      restaurantName = places.details[0].name;
    } catch (error) {
      restaurantName = "N/A";
    }
  }

  const getRestaurantAddress = async () => {
    try {
      restaurantAddress = places.details[0].formatted_address;
    } catch (error) {
      restaurantAddress = "N/A";
    }
  }

  const getRestaurantType = async () => {
    try {
      restaurantType = places.details[0].types[0];
    } catch (error) {
      restaurantType = "N/A";
    }
  }

  const getRestaurantPrice = async () => {
    try {
      var temp = places.details[0].price_level;
      if ( temp == 0) {
        restaurantPrice = "Free";
      }

      if ( temp == 1) {
        restaurantPrice = "Inexpensive ($)";
      }

      if ( temp == 2) {
        restaurantPrice = "Moderate ($$)";
      }

      if ( temp == 3) {
        restaurantPrice = "Expensive ($$$)";
      }

      if ( temp == 4) {
        restaurantPrice = "Very Expensive ($$$$)";
      }

    } catch (error) {
      restaurantPrice = "N/A";
    }
  }

  const getRestaurantRating = async () => {
    try {
      restaurantRating = places.details[0].rating;
    } catch (error) {
      restaurantRating = "N/A";
    }
  }

  const getRestaurantWebsite = async () => {
    try {
      restaurantName = places.details[0].website;
    } catch (error) {
      restaurantName = "N/A";
    }
  }

  const backgroundImage = "https://wallpaperaccess.com/full/629233.jpg"
  ;

  const background = {
    uri: "https://previews.123rf.com/images/olenayepifanova/olenayepifanova1712/olenayepifanova171200041/92051683-set-of-vector-cartoon-doodle-icons-junk-food-illustration-of-comic-fast-food-seamless-texture-patter.jpg"
  };


const getRestaurantPhoto = async() => {
  try {
    places.setPhoto_reference = places.details[0].photos[0].photo_reference;
    backgroundImage = "data:image/jpeg;base64," + places.getPhoto();

  } catch (error) {
    
  }
}

  

  const GPS = async () => {
    openMap({ latitude: 40.520710, longitude: -74.285720 });
  }

  const phoneNumber = async (restaurantPhoneNumber) => {
    var formatted_number = restaurantPhoneNumber.replace(/\D/g,'');
    var int_formatted_number = parseInt(formatted_number);
    try {
      Linking.openURL(`tel:${int_formatted_number}`)
    } catch (error) {

    }
  }

/*
getRestaurantPhoneNumber();
getRestaurantName();
getRestaurantAddress();
getRestaurantType();
getRestaurantPrice();
getRestaurantRating();
getRestaurantWebsite();
getRestaurantPhoto();
*/


  

//const { width, height } = Dimensions.get('window');

const width = 20;
const height = 40;

const cross = Math.sqrt(width * width + height * height);

const maped = "https://www.google.com/maps/search/?api=1&query='Mcdonalds+160+broadway+newyork+city+ny'";


const openGoogleMaps = async (address) => {
  var googleQuery = "https://www.google.com/maps/search/?api=1&query=";
  var restaurantEncoded = encodeURIComponent(address);
  try {
    Linking.openURL(googleQuery + "'" + restaurantEncoded + "'");

  } catch(error) {

  }}

  const openRestaurantWebsite = async (website) => {
    try {
      Linking.openURL(restaurantWebsite)
    } catch (error) {

    }
  }



export default (props) => {
    const auth = useContext(AuthContext);
    const places = useContext(PlacesContext);

    getRestaurantPhoneNumber();
    getRestaurantName();
    getRestaurantAddress();
    getRestaurantType();
    getRestaurantPrice();
    getRestaurantRating();
    getRestaurantWebsite();
    getRestaurantPhoto();

  

    return (
        <SafeAreaView style={{flex:1, backgroundColor:"#000000"}}>


        <View style = {styles.container}>
          
            <View style={{backgroundColor: '#DC143C'}}>
            <Text style={styles.message}s>{restaurantName}</Text>
            </View>
            <View style = {styles.logoContainer}>
            <TouchableOpacity onPress={() => openRestaurantWebsite(restaurantWebsite)}>
                <ImageLoader 
                    style = {styles.logo}
                    source={{
                    uri: backgroundImage,
                }} />
                 </TouchableOpacity>
            </View>
            <Text style = {styles.header}>Info</Text>
            <View style={{borderColor:'#DCDCDC',borderBottomWidth:1,borderTopWidth:1}}>
            <TouchableOpacity onPress={() => openGoogleMaps(restaurantAddress)}>
            <Text style={styles.innerText }>{restaurantAddress}</Text> 
            </TouchableOpacity>
            </View>
            <View style={{borderColor:'#DCDCDC',borderBottomWidth:1,borderTopWidth:0}}>
                <TouchableOpacity onPress={() => phoneNumber(restaurantPhoneNumber)}>
                <Text style={styles.innerText }>{restaurantPhoneNumber}</Text>  

                </TouchableOpacity>
            </View>
            <View style={{borderColor:'#DCDCDC',borderBottomWidth:1,borderTopWidth:0}}>
            <Text style={styles.innerText }>{restaurantPrice}</Text>  
            </View>
            <View style={{borderColor:'#DCDCDC',borderBottomWidth:1,borderTopWidth:0}}>
            <Text style={styles.innerText }>{restaurantType}</Text>  
            </View>
  
        </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
  background_image: {
    flexGrow: 1,
    justifyContent: "flex-start",
    width: "100%",
    resizeMode: "cover",
  },
    container: {
        flex: 1,
        backgroundColor: '#FFFAFA',
      },
      message:{
        fontWeight:"bold",
        fontSize:40,
        color:"#F8F8FF",
        marginTop:10,
        marginBottom:10,
        textAlign: 'left',
      },
      logo: {
        width: height*8,
        height: height*8,
        borderRadius: height*8 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#DC143C",
        marginTop:10,
        marginBottom:10,
      },
      header:{
        fontWeight:"bold",
        fontSize:20,
        color:"#000000",
        textAlign: 'left',
        marginBottom: 0,
      },
      logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerText: {
          fontSize:20,
          color: '#696969',
          textAlign: 'left',
          marginTop:12,
          marginBottom:12,
      },
      inputView:{
        width:width*.8,
        backgroundColor:"#465881",
        borderRadius:25,
        height:height*.1,
        justifyContent:"center",
        marginBottom:10,
        alignItems:'center',
      },

});