import { Text, View } from "react-native"
import { Button } from "@rneui/base"
import { NavigationContainer } from "@react-navigation/native"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { HomePage } from "./src/screens/HomePage"
import { Authorization } from "./src/screens/Authorization"
import { QuestionPage } from "./src/screens/QuestionPage"

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Authorization"
          component={Authorization}
          options={{ title: "Authorization" }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Questions"
          component={QuestionPage}
          options={{ title: "Questions" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
