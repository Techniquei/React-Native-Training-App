import { Button, Icon, Image, Skeleton, Text } from "@rneui/themed"
import React, { useState, useEffect } from "react"
import { Dimensions, ScrollView, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Props } from "../../App"
import { getExerciseInfo } from "../api"
import { getStoreUserId } from "../store"
import { DeatiledLikeButton } from "../components/DetailedLikeButton"

const technicSteps = [
  "Возьмитесь руками за перекладину удобным Вам хватом: узким, средним, широким или обратным",
  "Стабилизируйте в висе плечи и лопатки",
  "Выполняйте подтягивание так чтобы грудная клетка тянулась к перекладине, происходит сгибание локтей",
  "В конечной точке нужно чтобы было произведено касание подбородком перекладины",
  "Возвращайтесь в исходную позицию и продолжайте повторения",
]

export function DetailedExercise({ route, navigation }: Props) {
  const [infoState, setInfoState] = useState(null)
  const [imageSize, setImageSize] = useState(0)
  useEffect(() => {
    getExerciseInfo(route.params.id).then((data) => setInfoState(data))
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon={{
            name: "search",
            type: "ionicon",
            color: "rgb(32, 137, 220);",
            size: 25,
          }}
          color="white"
          style={{ paddingRight: 10 }}
          titleStyle={{
            color: "rgb(32, 137, 220)",
            fontWeight: 500,
            fontSize: 18,
          }}
          iconRight
          onPress={() => navigation.navigate("Search")}
        />
      ),
    })
  }, [])

  useEffect(() => {
    if (infoState) {
      console.log(infoState)
      Image.getSize(infoState.image, (width, height) =>
        setImageSize(height / width)
      )
    }
  }, [infoState])

  if (infoState)
    return (
      <View style={{ height: "100%", backgroundColor: "white", flex: 1 }}>
        <ScrollView
          style={{ display: "flex" }}
          contentContainerStyle={{ padding: 15 }}
        >
          <Text h4 style={{ textAlign: "center", marginBottom: 10 }}>
            {infoState.title}
          </Text>
          <Text style={{ fontSize: 15 }}>
            {infoState.description}
          </Text>
          <Text h4 style={{ textAlign: "center", marginVertical: 10 }}>
            Техника выполнения
          </Text>

          <Image
            source={{
              uri: infoState.image,
            }}
            containerStyle={{
              width: "100%",
              height: Dimensions.get("window").width - 10 * imageSize,
              marginBottom: 10,
            }}
          />

          {technicSteps.map((text, index) => (
            <View key={index}>
              <Skeleton height={60} style={{backgroundColor: 'rgb(32, 137, 220)', borderRadius: 10}} />

              {index < technicSteps.length - 1 ? (
                <Icon name="arrow-down" type="ionicon" />
              ) : (
                ""
              )}
            </View>
          ))}
        </ScrollView>
        <View>
          <DeatiledLikeButton exerciseId={route.params.id} />
        </View>
      </View>
    )
}
