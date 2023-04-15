import { Image, TabView, Text, Button, Dialog, Overlay, AirbnbRating, ButtonGroup } from "@rneui/themed"
import { View, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { CurrentTrainingsCard } from "../CurrentTrainingsCard"
import React, { useState } from "react"
import { ExercisesList } from "../ExercisesList"
import { Props } from "../../../App"

const ids = [1, 2, 3]

export function CurrentTraining({
  navigation,
}: {
  navigation: Props["navigation"]
}) {
  const [loadingState, setLoadingState] = useState(false)
  const [overlayState, setOverlayState] = useState(false)
  const [difficultyIndex, setDifficultyIndex]  = useState()
  const [rating, setRating] = useState(3)
  return (
    <TabView.Item style={{ width: "100%" }}>
      <ScrollView>
        {loadingState ? (
          <Dialog.Loading />
        ) : (
          <View>
            <Text h3 style={{ textAlign: "center", marginTop: 15 }}>
              Current Training
            </Text>
            <ExercisesList ids={ids} navigation={navigation} />
            <Button
              buttonStyle={{
                margin: 15,
                borderRadius: 15,
                backgroundColor: "green",
              }}
              title="FINISH"
              icon={{ name: "flag", type: "ionicon", color: "white", size: 30 }}
              titleStyle={{ fontSize: 20, fontWeight: "700", letterSpacing: 2 }}
              onPress={() => setOverlayState(true)}
            />
          </View>
        )}
        <Overlay isVisible={overlayState}  >
          <Text h4 style={{textAlign: 'center'}}>Оцените эту тренировку</Text>
          <AirbnbRating reviewColor='rgb(32, 137, 220)' onFinishRating={(value)=>setRating(value)} />
          <Text h4 style={{textAlign: 'center'}}>Оцените сложность тренировки</Text>
          <ButtonGroup buttons={['TOO EASY', 'NORMAL', 'TOO HARD']} selectedIndex={difficultyIndex} onPress={(value)=>setDifficultyIndex(value)} />
          {(rating && difficultyIndex !== undefined) ? <Button onPress={()=>{
            setLoadingState(true)
            setOverlayState(false)
            setDifficultyIndex(undefined)
            setRating(3)
            setTimeout(()=> setLoadingState(false), 1000)
          }} color='green' buttonStyle={{borderRadius: 15}}>Отправить отзыв</Button> : '' }
            
        </Overlay>
      </ScrollView>
    </TabView.Item>
  )
}
