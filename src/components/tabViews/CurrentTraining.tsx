import {
  TabView,
  Text,
  Button,
  Dialog,
  Overlay,
  AirbnbRating,
  ButtonGroup,
} from "@rneui/themed"
import { View, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { ExercisesList } from "../ExercisesList"
import { Props } from "../../../App"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { finishTraining, getTraining } from "../../api"
import { getStoreUserId } from "../../store"

export function CurrentTraining({
  navigation,
}: {
  navigation: Props["navigation"]
}) {
  const [overlayState, setOverlayState] = useState(false)
  const [difficultyIndex, setDifficultyIndex] = useState()
  const [rating, setRating] = useState(5)
  const [userIdState, setUserIdState] = useState(null)
  useEffect(() => {
    getStoreUserId().then((data) => setUserIdState(data))
  }, [])
  const queryClient = useQueryClient()
  const { data, isSuccess } = useQuery({
    queryFn: () => getTraining(userIdState),
    onSettled: () => console.log(data),
    queryKey: ["current", userIdState],
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: ({userIdState, difficultyIndex, rating}) =>
      finishTraining(userIdState, difficultyIndex, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current"] })
    },
  })
  useEffect(
    () => console.log(difficultyIndex, rating),
    [difficultyIndex, rating]
  )
  return (
    <TabView.Item style={{ width: "100%", backgroundColor: "#ccddeb" }}>
      <ScrollView>
        {isSuccess && data && !isLoading ? (
          <View>
            <ExercisesList
              ids={data}
              navigation={navigation}
              parent="current"
              loading={!isSuccess || isLoading || !data}
            />
            <Button
              buttonStyle={{
                margin: 15,
                borderRadius: 10,
              }}
              title="FINISH"
              icon={{
                name: "flag",
                type: "ionicon",
                size: 30,
                color: '#FFFF'
              }}
              titleStyle={{
                fontSize: 20,
                fontWeight: "700",
                letterSpacing: 2,
              }}
              onPress={() => setOverlayState(true)}
            />
          </View>
        ) : (
          <Dialog.Loading />
        )}
        <Overlay
          isVisible={overlayState}
          onBackdropPress={() => setOverlayState(false)}
          overlayStyle={{
            borderRadius: 10,
            padding: 15,
            margin: 10,
            width: "95%",
          }}
        >
          <Text h4 style={{ textAlign: "center" }}>
            Оцените эту тренировку
          </Text>
          <AirbnbRating
            reviewColor="rgb(32, 137, 220)"
            onFinishRating={(value) => setRating(value)}
            defaultRating={5}
          />
          <Text h4 style={{ textAlign: "center" }}>
            Оцените сложность тренировки
          </Text>
          <ButtonGroup
            buttons={["TOO EASY", "NORMAL", "TOO HARD"]}
            selectedIndex={difficultyIndex}
            onPress={(value) => setDifficultyIndex(value)}
            containerStyle={{
              width: "100%",
              alignSelf: "center",
              maxWidth: 370,
              marginTop: 10,
              marginBottom:  15
            }}
          />

          <Button
            disabled={!(rating && difficultyIndex !== undefined)}
            onPress={() => {
              mutate({userIdState, difficultyIndex, rating})
              setOverlayState(false)
              setDifficultyIndex(undefined)
              setRating(3)
            }}
            buttonStyle={{ borderRadius: 10 }}
            titleStyle={{
              fontSize: 20,
              fontWeight: "700",
              letterSpacing: 2,
            }}
          >
            ЗАВЕРШИТЬ
          </Button>
        </Overlay>
      </ScrollView>
    </TabView.Item>
  )
}
