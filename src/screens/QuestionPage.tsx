import { Button, ButtonGroup, Text } from "@rneui/themed"
import React, { useState } from "react"
import { View } from "react-native"

export function QuestionPage({navigation}) {
  const [goalState, setGoalState] = useState(1)
  const [musclesState, setMusclesState] = useState([])
  return (
    <View style={{ display: 'flex', alignItems: "center", justifyContent:'center', height: "100%" }}>
      <Text h4>What is your goal?</Text>
      <ButtonGroup
        buttons={["Weight loss", "Health", "Strength"]}
        selectedIndex={goalState}
        onPress={(value) => {
          setGoalState(value)
        }}
        textStyle={{ padding: 10 }}
        containerStyle={{ height: 60 }}
      />
      {goalState === 2 ? (
        <>
          <Text h4>What muscles do you want to build up?</Text>
          <ButtonGroup
            buttons={["Legs", "Hands", "Shoulders", "Back", "Chest"]}
            onPress={(value) => {
              setMusclesState(value)
            }}
            containerStyle={{ width: 200 }}
            vertical
            selectMultiple
            selectedIndexes={musclesState}
          />
        </>
      ) : (
        ""
      )}
      <Button style={{}} onPress={()=>{
            navigation.navigate("Home")
      }} >Submit</Button>
    </View>
  )
}
