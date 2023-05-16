import {
  ButtonGroup,
  Divider,
  Icon,
  Image,
  TabView,
  Text,
} from "@rneui/themed"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { HistoryListItem } from "../HistoryListItem"
import { Props } from "../../../App"
import { useState } from "react"
import { goalByIndex, musclesList } from "../../screens/QuestionPage"
import { Button, Dialog } from "@rneui/base"

export function History({ navigation }: { navigation: Props["navigation"] }) {
  const [goalState, setGoalState] = useState(1)
  const [musclesState, setMusclesState] = useState<string[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  function musclesHandler(name: string) {
    if (musclesState.includes(name)) {
      setMusclesState(musclesState.filter((s) => s != name))
    } else {
      setMusclesState([...musclesState, name])
    }
  }
  return (
    <TabView.Item style={{ width: "100%", backgroundColor: '#ccddeb' }}>
      <ScrollView>
        <View style={{ padding: 15, alignItems: "center" }}>
          <Text h4 style={{ textAlign: "center", marginBottom: 15 }}>
            example@mail.ru
          </Text>

          <View>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Моя цель:{" "}
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "700" }}
              >
                {goalByIndex(goalState)}
              </Text>
            </Text>

            <ButtonGroup
              buttons={[
                <Icon name="leaf" type="ionicon" color="lawngreen" size={70} />,
                <Icon name="heart" type="ionicon" color="salmon" size={70} />,
                <Icon name="barbell" type="ionicon" size={70} />,
              ]}
              selectedIndex={goalState}
              onPress={(value) => {
                setGoalState(value)
              }}
              selectedButtonStyle={{ borderRadius: 10, borderWidth: 5, borderColor: 'rgb(32, 137, 220)', backgroundColor: 'white' }}
              buttonStyle={{ width: 90, height: 90 }}
              buttonContainerStyle={{ width: 90, height: 90, borderWidth: 0, backgroundColor: 'white', borderRadius: 10 }}
              containerStyle={{ gap: 10, height: 90, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', borderWidth: 0 }}
            />
          </View>
          {goalState == 2 ? (
            <View>
              <Text
                style={{ textAlign: "center", fontSize: 20, marginBottom: 5 }}
              >
                Приоритетные мышцы
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  maxWidth: 300,
                  gap: 10
                }}
              >
                {musclesList.map((item, index) => (
                  <TouchableOpacity
                    key={item.name + index}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderColor: musclesState.includes(item.name)
                        ? "rgb(32, 137, 220)"
                        : "white",
                      borderWidth: 5,
                      borderRadius: 10,
                    }}
                    onPress={() => musclesHandler(item.name)}
                  >
                    <Image
                      source={{ uri: item.Image }}
                      style={{
                        width: 60,
                        height: 60,
                        tintColor: "black",
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            ""
          )}
        </View>
        <Button
          title="Выйти  "
          type="clear"
          color="error"
          titleStyle={{ color: "red" }}
          icon={<Icon name="exit" type="ionicon" size={30} color="red" />}
          iconRight
          onPress={() => setDialogOpen(true)}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: 10,
            marginBottom: 5,
          }}
        >
         История тренировок
        </Text>
        <Divider />
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
        <Dialog
          isVisible={dialogOpen}
          onBackdropPress={() => setDialogOpen(false)}
          overlayStyle={{ backgroundColor: "white" }}
        >
          <Text h4 style={{ textAlign: "center", marginBottom: 10 }}>
            Вы уверены?
          </Text>
          <Button
            title="Выйти"
            color="error"
            onPress={() => {
              console.log("navigation")
              navigation.addListener("beforeRemove", (e) =>
                navigation.dispatch(e.data.action)
              )
              navigation.navigate("Authorization")
            }}
          />
        </Dialog>
      </ScrollView>
    </TabView.Item>
  )
}
