import { Image, TabView, Text, Button, Dialog } from "@rneui/themed"
import { View, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { CurrentTrainingsCard } from "../CurrentTrainingsCard"
import React, { useState } from "react"
import { ExercisesList } from "../ExercisesList"
import { Props } from "../../../App"

const ids = [1, 2, 3]

export function CurrentTraining({navigation}:Props) {
  const [loadingState, setLoadingState] = useState(false)
  return (
    <TabView.Item style={{width: '100%'}} >
      <ScrollView>
        {loadingState ? (
          <Dialog.Loading />
        ) : (
          <View>
            <Text h3 style={{ textAlign: "center", marginTop: 15 }}>
              Current Training
            </Text>
            <ExercisesList ids={ids}  navigation={navigation} />
            <Button
              buttonStyle={{
                margin: 15,
                borderRadius: 15,
                backgroundColor: "green",
              }}
              title="FINISH"
              icon={{ name: "flag", type: "ionicon", color: "white", size: 30 }}
              titleStyle={{ fontSize: 20, fontWeight: "700", letterSpacing: 2 }}
              onPress={()=>setLoadingState(true)}
            />
          </View>
        )}
      </ScrollView>
    </TabView.Item>
  )
}
