import {
  ButtonGroup,
  Divider,
  Icon,
  Image,
  ListItem,
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
    <TabView.Item style={{ width: "100%" }}>
      <ScrollView>
        <View style={{ padding: 15, alignItems: "center" }}>
          <Text h4 style={{ textAlign: "center", marginBottom: 15 }}>
            example@mail.ru
          </Text>

          <View>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              My goal:{" "}
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "700" }}
              >
                {goalByIndex(goalState)}
              </Text>
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
              <Text
                style={{ textAlign: "center", fontSize: 20, marginBottom: 5 }}
              >
                Pumping muscles
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
        </View>
        <Button
          title="Log Out"
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
          My trainings
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
            Are you sure?
          </Text>
          <Button
            title="Log Out"
            color="error"
            onPress={() => {
              console.log('navigation')
              navigation.addListener('beforeRemove', (e)=>navigation.dispatch(e.data.action))
              navigation.navigate('Authorization')}}
          />
        </Dialog>
      </ScrollView>
    </TabView.Item>
  )
}
