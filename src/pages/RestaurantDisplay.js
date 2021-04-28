import React, { useState, useContext, useEffect, Component } from "react";
import {
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Image,
  Animated,
  Linking,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext, AuthProvider } from "../context";
import logo from "../images/ru.jpg";
import { ScrollView } from "react-native-gesture-handler";
import openMap from "react-native-open-maps";
import { PlacesContext, PlacesProvider } from "../context/Places";
import Icon from "react-native-vector-icons/FontAwesome";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { Likes } from "../components";

//const places = useContext(PlacesContext);

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

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
                }),
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}
var backgroundImage = "https://wallpaperaccess.com/full/629233.jpg";
/*
  const background = {
    uri: "https://previews.123rf.com/images/olenayepifanova/olenayepifanova1712/olenayepifanova171200041/92051683-set-of-vector-cartoon-doodle-icons-junk-food-illustration-of-comic-fast-food-seamless-texture-patter.jpg"
  };
  */

const getRestaurantPhoto = async (p) => {
  try {
    p.setPhoto_reference = p.details[0].photos[0].photo_reference;
    backgroundImage = "data:image/jpeg;base64," + p.getPhoto();
  } catch (error) {}
};

const getPrice = async (temp) => {
  if (temp == 0) {
    return "Free";
  }

  if (temp == 1) {
    return "Inexpensive ($)";
  }

  if (temp == 2) {
    return "Moderate ($$)";
  }

  if (temp == 3) {
    return "Expensive ($$$)";
  }

  if (temp == 4) {
    return "Very Expensive ($$$$)";
  }

  return "";
};

const GPS = async () => {
  openMap({ latitude: 40.52071, longitude: -74.28572 });
};

const phoneNumber = async (number) => {
  var formatted_number = number.replace(/\D/g, "");
  var int_formatted_number = parseInt(formatted_number);
  try {
    Linking.openURL(`tel:${int_formatted_number}`);
  } catch (error) {}
};

//const { width, height } = Dimensions.get('window');

const maped =
  "https://www.google.com/maps/search/?api=1&query='Mcdonalds+160+broadway+newyork+city+ny'";

const openGoogleMaps = async (address) => {
  var googleQuery = "https://www.google.com/maps/search/?api=1&query=";
  var restaurantEncoded = encodeURIComponent(address);
  try {
    Linking.openURL(googleQuery + "'" + restaurantEncoded + "'");
  } catch (error) {}
};

const openRestaurantWebsite = async (website) => {
  try {
    Linking.openURL(website);
  } catch (error) {}
};

const test = () => {
  return "hello";
};

const test2 = () => {
  placesContext.setPhoto("https://wallpaperaccess.com/full/629233.jpg");
};

//const width = useWindowDimensions.width;
//const height = useWindowDimensions.height;

const { width, height } = Dimensions.get("window");

export default (props) => {
  const auth = useContext(AuthContext);
  const placesContext = useContext(PlacesContext);

  const width = useWindowDimensions.width;
  const height = useWindowDimensions.height;

  const {
    restaurantPhoneNumber,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantPrice,
    restaurantRating,
    restaurantWebsite,
    googleRestaurantAddress,
    places,
    priceColor,
    photo,
    GOOGLE_API_KEY,
  } = placesContext.state;

  const styles = StyleSheet.create({
    background_image: {
      flexGrow: 1,
      justifyContent: "flex-start",
      width: "100%",
      resizeMode: "cover",
    },
    container: {
      flex: 1,
      backgroundColor: "#FFFAFA",
      marginBottom: 0,
    },
    message: {
      fontWeight: "bold",
      fontSize: 28,
      color: "#FF6347",
      //marginTop:10,
      //marginBottom:10,
      textAlign: "center",
      textAlignVertical: "center",
      //flex: 1,
      //width: width,
      //height: height,
      width: "100%",
    },
    logo: {
      width: height * 8,
      height: height * 8,
      borderRadius: (height * 8) / 2,
      overflow: "hidden",
      borderWidth: 3,
      borderColor: "#DC143C",
      marginTop: 10,
      marginBottom: 10,
    },
    header: {
      fontWeight: "bold",
      fontSize: 25,
      color: "#FF6347",
      textAlign: "center",
      marginBottom: 5,
      marginTop: 5,
    },
    logoContainer: {
      //justifyContent: 'center',
      //alignItems: 'center',
      flex: 3,
    },
    innerText: {
      fontSize: 20,
      color: "#696969",
      textAlign: "left",
      marginTop: 12,
      marginBottom: 12,
    },
    inputView: {
      width: width * 0.8,
      backgroundColor: "#465881",
      borderRadius: 25,
      height: height * 0.1,
      justifyContent: "center",
      marginBottom: 10,
      alignItems: "center",
    },
    innerText2: {
      fontSize: 20,
      color: "#7FFF00",
      textAlign: "left",
      marginTop: 12,
      marginBottom: 12,
    },

    card: {
      height: "30%",
      width: "80%",
      backgroundColor: "white",
      borderRadius: 15,
      padding: 10,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      alignItems: "center",
      justifyContent: "center",
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },

    backButton: {
      //elevation: 8,
      backgroundColor: "#FF6347",
      borderRadius: 10,
      paddingVertical: 4,
      paddingHorizontal: 18,
      marginTop: 15,
      //alignSelf: "flex-end",
      //position: 'absolute',
      bottom: 0,
    },

    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        {places[0].hasOwnProperty("name") && (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              width: width,
              alignContent: "center",
            }}
          >
            <Text style={styles.message}>{places[0].name}</Text>
          </View>
        )}

        <View style={styles.logoContainer}>
          {/*<ImageLoader 
                    style = {styles.logo}
                    source={{
                    uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + places[0].photos[0].width +
                    "&photoreference=" + places[0].photos[0].photo_reference + "&key=" + GOOGLE_API_KEY,
                }} />*/}

          <Image
            source={{
              uri:
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" +
                places[0].photos[0].width +
                "&photoreference=" +
                places[0].photos[0].photo_reference +
                "&key=" +
                GOOGLE_API_KEY,
            }}
            style={{ width: "100%", height: "40%", flex: 1 }}
          />
        </View>

        <Text style={styles.header}> Info</Text>

        <View style={{ flex: 1 }}>
          {places[0].hasOwnProperty("vicinity") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => openGoogleMaps(places[0].vicinity)}
              >
                <Text style={styles.innerText}>
                  {"Address: " + places[0].vicinity}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {places[0].hasOwnProperty("formatted_phone_number") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <TouchableOpacity
                onPress={() => phoneNumber(places[0].formatted_phone_number)}
              >
                <Text style={styles.innerText}>
                  {places[0].formatted_phone_number}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {places[0].hasOwnProperty("price_level") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "left",
                  marginTop: 12,
                  marginBottom: 12,
                  color: "#696969",
                }}
              >
                {"Price Level: " + places[0].price_level + "/4"}
              </Text>
            </View>
          )}

          {places[0].hasOwnProperty("types") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <Text style={styles.innerText}>
                {"Type: " + places[0].types[0]}
              </Text>
            </View>
          )}

          {places[0].hasOwnProperty("rating") && (
            <View
              style={{
                borderColor: "#DCDCDC",
                borderBottomWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <Text style={styles.innerText}>
                {"Rating: " + places[0].rating}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: "40%",
            justifyContent: "center",
          }}
        >
          <View style={styles.card}>
            <Text styles={{ fontWeight: "Bold" }}>Top Comment:</Text>
            <Text>Gus says, I love this place! I go here every Friday!</Text>
          </View>

          <View style={{ flexDirection: "column", flex: 1 }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("home")}
              style={styles.backButton}
            >
              <Text style={styles.appButtonText}>{"Retry"} </Text>
            </TouchableOpacity>
            <View>
              <Likes placeId={places[0].place_id} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
