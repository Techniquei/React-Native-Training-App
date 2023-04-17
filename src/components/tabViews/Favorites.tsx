import { TabView, Text, Dialog } from "@rneui/themed"
import { ScrollView, TouchableOpacity } from "react-native"
import React from "react"
import { CurrentTrainingsCard } from "../CurrentTrainingsCard"
import { ExercisesList } from "../ExercisesList"
import { Props } from "../../../App"
const ids = [1, 2, 3, 4]
export function Favorites({navigation}:{navigation : Props['navigation']}) {
  return (
    <TabView.Item style={{ width: "100%" }}>
      <ScrollView>
        <>
          <Text h3 style={{ textAlign: "center", marginTop: 15 }}>
            Favorites
          </Text>
          <ExercisesList navigation={navigation} ids={ids} parent="favorites" />
        </>
      </ScrollView>
    </TabView.Item>
  )
}
