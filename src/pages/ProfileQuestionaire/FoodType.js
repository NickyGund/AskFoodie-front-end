import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const { width, height } = Dimensions.get('window');


export default (props) => {
    const [selectedItems, setSelectedItems] = useState([])
    const items = [{
        id: '92iijs7yta',
        name: 'Chinese',
      }, {
        id: 'a0s0a8ssbsd',
        name: 'Italian',
      }, {
        id: '16hbajsabsd',
        name: 'American',
      }, {
        id: 'nahs75a5sg',
        name: 'Indian',
      }, {
        id: '667atsas',
        name: 'Mexican',
      }, {
        id: 'hsyasajs',
        name: 'Japanese',
      }, {
        id: 'djsjudksjd',
        name: 'French',
      }, {
        id: 'sdhyaysdj',
        name: 'Vietnamese',
      }, {
        id: 'suudydjsjd',
        name: 'Greek',
      }];

      const onSelectedItemsChange = (selected) => {
          setSelectedItems(selected)

      }


    return (
        <View style={{ flex: 1, alignItems:'center' }}>
            <View style = {{marginTop:30}}>
                <Text style = {{fontSize: 17}}>Which cuisines are your go to?</Text>
            </View>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Close"
          searchInputStyle = {{padding:20,}}
          styleMainWrapper = {{width: width, padding:20}}
          styleDropdownMenuSubsection = {{padding:50}}
          styleListContainer = {{padding:10}}
          styleTextDropdown = {{paddingLeft:20}}
        />
 
        <View style = {{flex:2,}}>
            <TouchableOpacity 
                style = {{borderColor:'black', height:25, width:75, borderWidth:1, alignItems:'center', justifyContent:'center'}}
                // onPress = {toFoodQuestion}
            >
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
      </View>
  );
}

