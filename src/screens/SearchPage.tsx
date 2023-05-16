import React, { useState, useEffect } from "react"
import { Props } from "../../App";
import { Dimensions, ScrollView, View } from "react-native"
import { Icon, SearchBar, Text } from "@rneui/themed";
import { StackActions } from "@react-navigation/native";
import { ExercisesList } from "../components/ExercisesList";

const recomendationIds = [1, 2]

export function SearchPage({ navigation } : Props){
    const [inputText, setInputText] = useState('')
    const [laodingState, setLoadingState] = useState(false)
    const popAction = StackActions.pop(1);
    useEffect(() => {
        navigation.setOptions({
            title: '',
          header: () => (
            <SearchBar value={inputText} onChangeText={(e)=>setInputText(e)}
                containerStyle={{backgroundColor: 'white', borderColor: 'white'}}
                inputContainerStyle={{backgroundColor: 'white'}} 
                cancelIcon = {<Icon name="arrow-back" type="ionicon" color="black" size={25}  onPress={()=>navigation.dispatch(popAction)} /> }
                searchIcon = {<Icon name="arrow-back" type="ionicon" color="black" size={25} onPress={()=>navigation.dispatch(popAction)} /> }
                clearIcon = {<Icon name="close" type="ionicon" color="black" size={25}  onPress={()=> setInputText('')} /> }
                platform="android"
                showLoading = {laodingState}
                autoFocus
            />
          ),
        })
      }, [inputText])
    return (
        <View style={{flexDirection: 'column'}}>
            <Text h4 style={{textAlign: 'center'}}>Рекомендации</Text>
            <ExercisesList ids={recomendationIds} parent="search" navigation={navigation}  />
        </View>
    )
}