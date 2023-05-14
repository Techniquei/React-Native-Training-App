import { Button } from "@rneui/base"
import { Dialog, SpeedDial, Tab, TabView, Text } from "@rneui/themed"
import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { CurrentTraining } from "../components/tabViews/CurrentTraining"
import { Favorites } from "../components/tabViews/Favorites"
import { History } from "../components/tabViews/Profile"
import { Props } from "../../App"
import { CustomButton } from "../components/ui/CustomButton"

const namesForIndex = ["ТРЕНИРОВКА", "ИЗБРАННЫЕ", "ПРОФИЛЬ"]

export function HomePage({ navigation }: { navigation: Props["navigation"] }) {
  const [index, setIndex] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  function myPreventDefault(e: any) {
    e.preventDefault()
  }
  useEffect(() => {
    navigation.setOptions({
      title: namesForIndex[index],
      headerLeft: () => (
        <Button
          icon={{
            name: "close",
            type: "ionicon",
            color: "rgb(28, 28, 30)",
            size: 25,
          }}
          color="white"
          style={{ paddingRight: 10, transform: "scaleX(-1)" }}
          onPress={() => setDialogOpen(true)}
        />
      ),
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
    navigation.addListener("beforeRemove", myPreventDefault)
    return () => navigation.removeListener("beforeRemove", myPreventDefault)
  })
  return (
    <>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <CurrentTraining navigation={navigation} />
        <Favorites navigation={navigation} />
        <History navigation={navigation} />
      </TabView>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Current"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "barbell", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Favorite"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "heart", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Profile"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "person", type: "ionicon", color: "white" }}
        />
      </Tab>
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
            console.log("navigation")
            navigation.addListener("beforeRemove", (e) =>
              navigation.dispatch(e.data.action)
            )
            navigation.navigate("Authorization")
          }}
        />
      </Dialog>
    </>
  )
}
