import { Icon, Image, ListItem, Text } from "@rneui/themed";
import { View } from "react-native";
import {useState} from 'react'
import { Props } from "../../App";
import {Ionicons, MaterialCommunityIcons
} from '@expo/vector-icons';

export function HistoryListItem({navigation}:{navigation:Props['navigation']}){
    const [expanded, setExpanded] = useState(false);
    return (
        <ListItem.Accordion bottomDivider content={
            <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>31/01/2022</Text>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>Normal</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text h4>5</Text>
                <Icon name="star" type="ionicon" color="#ffc400" size={25} />
              </View>
            </View>
          </View>
        }
        isExpanded = {expanded}
        onPress={()=>setExpanded(!expanded)}
        icon={<Icon name="chevron-down" type="ionicon" size={35} />}



        >
          <View
              style={{ flexDirection: "row", gap: 5, justifyContent: "center", backgroundColor: 'white', padding: 10 }}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderColor: "rgb(32, 137, 220)",
                  borderWidth: 2,
                  borderRadius: 10,
                }}
                source={{
                  uri: "https://i0.wp.com/trener59.ru/wp-content/uploads/2019/12/podtjagivanija-na-perekladine-foto.jpg?w=160&ssl=1",
                }}

                onPress={()=>navigation.navigate('Detailed')}
              />
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderColor: "rgb(32, 137, 220)",
                  borderWidth: 2,
                  borderRadius: 10,
                }}
                source={{
                  uri: "https://i0.wp.com/trener59.ru/wp-content/uploads/2019/12/pulover-foto.jpg?w=160&ssl=1",
                }}
                onPress={()=>navigation.navigate('Detailed')}
              />
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderColor: "rgb(32, 137, 220)",
                  borderWidth: 2,
                  borderRadius: 10,
                }}
                source={{
                  uri: "https://i0.wp.com/trener59.ru/wp-content/uploads/2019/12/zhim-gantelej-ljozha.jpg?w=160&ssl=1",
                }}
                onPress={()=>navigation.navigate('Detailed')}
              />
            </View>
        </ListItem.Accordion>
    )
}