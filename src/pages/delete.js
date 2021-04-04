import React, {useState, useContext, useEffect, Component } from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Text, TextInput , Platform, Button, TouchableOpacity, Alert, Image, Animated, Linking, ImageBackground} from 'react-native';

import logo from '../images/ru.jpg';
const fs = require("fs");

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
jsonReader("./bad.json", (err, bad) => {
  if (err) {
    console.log(err);
    return;
  }
  ///console.log(bad.result.formatted_address);
  //console.log(bad.result.formatted_phone_number);
  //console.log(bad.result.name);

});


let test = require('./bad.json');
console.log(test.result.formatted_address);
console.log(test.result.formatted_phone_number);
console.log(test.result.name);
console.log(test.result.types[0]);
console.log(test.result.rating);

//encodeURIComponent() //encode url
//myString = myString.replace(/\D/g,'');  //format number



const maped = "https://www.google.com/maps/search/?api=1&query='Mcdonalds+160+broadway+newyork+city+ny'";


const openGoogleMaps = async (address) => {
  var googleQuery = "https://www.google.com/maps/search/?api=1&query=";
  var restaurantEncoded = encodeURIComponent(address);
  console.log(googleQuery + "'" + restaurantEncoded + "'");
}

openGoogleMaps("633 New Brunswick Ave, Perth Amboy, NJ 08861");
console.log(maped);



function getBase64Image(img) {
  // Create an empty canvas element
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  // Copy the image contents to the canvas
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to guess the
  // original format, but be aware the using "image/jpg" will re-encode the image.
  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

console.log(getBase64Image(logo));




//icon gets image

