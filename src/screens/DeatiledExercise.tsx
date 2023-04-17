import { color } from "@rneui/base"
import { Button, Divider, Icon, Image, Text } from "@rneui/themed"
import React, { useState, useEffect } from "react"
import { Dimensions, ScrollView, View } from "react-native"

const technicImg =
  "https://avatars.dzeninfra.ru/get-zen_doc/101122/pub_5dc5c231c3cd3c2757f63271_5dc5d6b168e68b2090785568/scale_1200"

const technicSteps = [
  "Возьмитесь руками за перекладину удобным Вам хватом: узким, средним, широким или обратным",
  "Стабилизируйте в висе плечи и лопатки",
  "Выполняйте подтягивание так чтобы грудная клетка тянулась к перекладине, происходит сгибание локтей",
  "В конечной точке нужно чтобы было произведено касание подбородком перекладины",
  "Возвращайтесь в исходную позицию и продолжайте повторения",
]

export function DetailedExercise() {
  const [imageSize, setImageSize] = useState(0)
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    Image.getSize(technicImg, (width, height) => setImageSize(height / width))
  }, [])
  return (
    <View style={{height: '100%', backgroundColor: 'white', flex: 1}}>
      <ScrollView style={{ display: "flex"}} contentContainerStyle={{padding:15}}>
        <Text h4 style={{ textAlign: "center", marginBottom: 10 }}>
          Подтягивания на перекладине
        </Text>
        <Text style={{ fontSize: 15 }}>
          Подтягивания — базовое всеми известное популярное упражнение
          выполняемое с собственным весом тела. Упражнение является
          многосуставным и отлично прорабатываем много мышечных групп спины и
          руки. Так же подтягивания укрепляют мышечный корсет и улучшают силовые
          показатели, укрепляются не только мышцы, но и связки и сухожилия.
          Вариантов подтягиваний очень много, существует целый вид спорта —
          воркаут.
        </Text>
        <Text h4 style={{ textAlign: "center", marginVertical: 10 }}>
          Техника выполнения
        </Text>

        <Image
          source={{
            uri: "https://avatars.dzeninfra.ru/get-zen_doc/101122/pub_5dc5c231c3cd3c2757f63271_5dc5d6b168e68b2090785568/scale_1200",
          }}
          containerStyle={{
            width: "100%",
            height: Dimensions.get("window").width - 10 * imageSize,
            marginBottom: 10,
          }}
        />

        {technicSteps.map((text, index) => (
          <View key={index}>
            <View style={{backgroundColor: 'rgb(32, 137, 220)', borderRadius: 30, padding: 10}} >
              <Text selectionColor={'white'}
                style={{ textAlign: "center", fontSize: 17, fontWeight:'700', color:  'white' }}
              >
                {text}
              </Text>
            </View>

            {index < technicSteps.length - 1 ? (
              <Icon name="arrow-down" type="ionicon" />
            ) : (
              ""
            )}
          </View>
        ))}
      </ScrollView>
      <View>
        <Button
          buttonStyle={{
            backgroundColor: liked ? "red" : "grey",
            height: 62
          }}
          title={liked ? "Liked" : "Add to favorites"}
          icon={{ name: "heart", type: "ionicon", color: "white", size: 30 }}
          titleStyle={{ fontSize: 20, fontWeight: "700", letterSpacing: 2 }}
          onPress={() => setLiked(!liked)}
        />
      </View>
    </View>
  )
}
