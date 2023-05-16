import { TabView, Text, Dialog, Button } from "@rneui/themed"
import { ScrollView, TouchableOpacity, View } from "react-native"
import React, {useState} from "react"
import { CurrentTrainingsCard } from "../CurrentTrainingsCard"
import { ExercisesList } from "../ExercisesList"
import { Props } from "../../../App"
import { CustomButton } from "../ui/CustomButton"
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9]
export function Favorites({ navigation }: { navigation: Props["navigation"] }) {
  const [seeMoreState, setSeeMoreState] = useState(false)
  return (
    <TabView.Item style={{ width: "100%", backgroundColor: '#ccddeb' }}>
      <ScrollView style={{paddingBottom: 15}}>
        <ExercisesList navigation={navigation} ids={seeMoreState ? ids : ids.slice(0,3)} parent="favorites" />
        <CustomButton color="grey" title="Показать еще" onPress={()=>setSeeMoreState(!seeMoreState)}  />
      </ScrollView>
    </TabView.Item>
  )
}
