import { Button, ButtonGroup, Icon, Image, Text } from "@rneui/themed"
import React, { useState } from "react"
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native"
import { Props } from "../../App"

export const musclesList = [
  {
    name: "Legs",
    Image:
      "https://icons.iconarchive.com/icons/icons8/windows-8/256/Sports-Leg-icon.png",
  },
  {
    name: "Arms",
    Image:
      "https://icons.iconarchive.com/icons/icons8/windows-8/256/Sports-Hand-Biceps-icon.png",
  },
  {
    name: "Shoulders",
    Image:
      "https://icons.iconarchive.com/icons/icons8/windows-8/512/Sports-Shoulders-icon.png",
  },
  {
    name: "Back",
    Image:
      "https://icons.iconarchive.com/icons/icons8/android/512/Sports-Back-icon.png",
  },
  {
    name: "Chest",
    Image: "https://icon-library.com/images/muscles-icon/muscles-icon-27.jpg",
  },
  {
    name: "Abs",
    Image:
      "https://icons.iconarchive.com/icons/icons8/windows-8/256/Sports-Prelum-icon.png",
  },
]

export function goalByIndex(index: number) {
  switch (index) {
    case 0:
      return "Slim"
    case 1:
      return "Health"
    case 2:
      return "Straight"
  }
}

export function QuestionPage({ navigation } : Props) {
  const [goalState, setGoalState] = useState(1)
  const [musclesState, setMusclesState] = useState<string[]>([])
  function musclesHandler(name: string) {
    if (musclesState.includes(name)) {
      setMusclesState(musclesState.filter((s) => s != name))
    } else {
      setMusclesState([...musclesState, name])
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        gap: 10,
      }}
    >
      <View>
        <Text h4 style={{ textAlign: "center" }}>
          What is your goal?
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {goalByIndex(goalState)}
        </Text>
        <ButtonGroup
          buttons={[
            <Icon name="leaf" type="ionicon" color="lawngreen" size={40} />,
            <Icon name="heart" type="ionicon" color="salmon" size={40} />,
            <Icon name="barbell" type="ionicon" size={40} />,
          ]}
          selectedIndex={goalState}
          onPress={(value) => {
            setGoalState(value)
          }}
          textStyle={{ padding: 10 }}
          containerStyle={{
            height: 60,
            width: "100%",
            maxWidth: 250,
            alignSelf: "center",
          }}
          selectedButtonStyle={{ backgroundColor: "grey" }}
        />
      </View>
      {goalState == 2 ? (
        <View>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom:5 }}>
            Select muscles
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 5,
              justifyContent: "center",
              maxWidth: 287,
            }}
          >
            {musclesList.map((item, index) => (
              <TouchableOpacity
                key={item.name + index}
                style={{
                  backgroundColor: musclesState.includes(item.name)
                    ? "grey"
                    : "white",
                  padding: 10,
                  borderColor: musclesState.includes(item.name)
                    ? "dimgrey"
                    : "gainsboro",
                  borderWidth: 1,
                  borderRadius: 2,
                }}
                onPress={() => musclesHandler(item.name)}
              >
                <Image
                  source={{ uri: item.Image }}
                  style={{
                    width: 70,
                    height: 70,
                    tintColor: musclesState.includes(item.name)
                      ? "white"
                      : "black",
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        ""
      )}

      <Button
        style={{ width: 202 }}
        onPress={() => {
          navigation.navigate("Home")
        }}
      >
        Submit
      </Button>
    </ScrollView>
  )
}
