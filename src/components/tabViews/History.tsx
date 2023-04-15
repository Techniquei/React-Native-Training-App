import { Icon, Image, ListItem, TabView, Text } from "@rneui/themed"
import { ScrollView, View } from "react-native"
import { HistoryListItem } from "../HistoryListItem"
import { Props } from "../../../App"

export function History({navigation}:{navigation: Props['navigation']}) {
  return (
    <TabView.Item style={{ width: "100%" }}>
      <ScrollView>
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
        <HistoryListItem navigation={navigation} />
      </ScrollView>
    </TabView.Item>
  )
}
