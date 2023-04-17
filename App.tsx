import { StatusBar, Text, View } from "react-native"
import { Button } from "@rneui/base"
import { NavigationContainer } from "@react-navigation/native"

import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { HomePage } from "./src/screens/HomePage"
import { Authorization } from "./src/screens/Authorization"
import { QuestionPage } from "./src/screens/QuestionPage"
import { DetailedExercise } from "./src/screens/DeatiledExercise"
import { ExercisesList } from "./src/components/ExercisesList"

const Stack = createNativeStackNavigator()
type RootStackParamList = {
  Home: undefined;
  Detailed: undefined;
  Authorization: undefined;
  Questions: undefined;
}
export type Props = NativeStackScreenProps<RootStackParamList>;

function App() {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor = "white" />
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Authorization"
          component={Authorization}
          options={{ title: "Authorization" }}
        />
        <Stack.Screen
          name="Questions"
          component={QuestionPage}
          options={{ title: "Questions" }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="Detailed"
          component={DetailedExercise}
          options={{ title: "Detailed" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
    
  )
}
export default App
