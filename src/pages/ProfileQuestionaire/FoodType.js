import React, { useContext, useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { ProfileQuestionaireContext } from '../../context'


const { width, height } = Dimensions.get('window');


export default (props) => {
   const questionaire = useContext(ProfileQuestionaireContext)
    const [selectedItems, setSelectedItems] = useState([])
    const items = [{
        id: 'chinese',
        name: 'Chinese',
      }, {
        id: 'italian',
        name: 'Italian',
      }, {
        id: 'american',
        name: 'American',
      }, {
        id: 'indian',
        name: 'Indian',
      }, {
        id: 'mexican',
        name: 'Mexican',
      }, {
        id: 'japanese',
        name: 'Japanese',
      }, {
        id: 'french',
        name: 'French',
      }, {
        id: 'vietnamese',
        name: 'Vietnamese',
      }, {
        id: 'greek',
        name: 'Greek',
      }];

      const onSelectedItemsChange = (selected) => {
        questionaire.setFoodTypes(selected)
      }

      const toDining = async () => {
        console.log(selectedItems)
        // await questionaire.setFoodTypes(setSelectedItems)
        props.navigation.navigate('dining')
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
          selectedItems={questionaire.state.foodTypes}
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
                onPress = {toDining}
            >
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
      </View>
  );
}

