import { Image, Card, Text, AirbnbRating, Button } from "@rneui/themed"
import { View } from "react-native"
const muscleGroup = "Back"
const muscleImage = require("../img/muscle.png")
const energyImage = require("../img/energy.png")

export function CurrentTrainingsCard({ id }: { id: number }) {
  return (
    <Card containerStyle={{ paddingLeft: 0, borderRadius: 15 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          style={{flex: 1, width: 120, height: 120, resizeMode: 'contain', flexShrink: 2}}
          source={{
            uri: "https://i0.wp.com/trener59.ru/wp-content/uploads/2019/12/podtjagivanija-na-perekladine-foto.jpg?w=160&ssl=1",
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 10 }}>
            Подтягивания на перекладине
          </Text>
          <View style={{marginLeft: -10}}>
            <Text style={{fontSize: 13, fontWeight: "700", marginLeft: 10, marginBottom: 10 }}>Muscle group: {muscleGroup}</Text>
            <AirbnbRating
            reviews={[
              "Dificulty",
              "Dificulty",
              "Dificulty",
              "Dificulty",
              "Dificulty",
            ]}
            defaultRating={3}
            size={20}
            reviewSize={13}
            ratingContainerStyle={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
            reviewColor="black"
            starImage={muscleImage}
            selectedColor={"red"}
            
            isDisabled
          />
          <AirbnbRating
            reviews={[
                'Energy',
                'Energy',
                'Energy',
                'Energy',
                'Energy',
            ]}
            defaultRating={3}
            size={20}
            reviewSize={13}
            ratingContainerStyle={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
            reviewColor="black"
            starImage={energyImage}
            isDisabled
          />
          </View>
          
        </View>
      </View>
    </Card>
  )
}
