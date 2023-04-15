import { Button } from "@rneui/base"
import { SpeedDial, Tab, TabView, Text } from "@rneui/themed"
import React, { useState } from "react"
import { View } from "react-native"
import { CurrentTraining } from "../components/tabViews/CurrentTraining"
import { Favorites } from "../components/tabViews/Favorites"
import { History } from "../components/tabViews/History"

export function HomePage({navigation}) {
  const [index, setIndex] = React.useState(0)
  return (
    <>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <CurrentTraining navigation={navigation} />
        <Favorites navigation={navigation} />
        <History />
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
          title="History"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "bar-chart", type: "ionicon", color: "white" }}
        />
      </Tab>
    </>
  )
}
