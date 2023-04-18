import { Button, ButtonGroup, Input, Text } from "@rneui/themed"
import { Formik } from "formik"
import { useState } from "react"
import { View, ScrollView } from "react-native"
import * as yup from "yup"
import { Props } from "../../App"

const initialValues = {
  password: "",
  age: "",
  weight: "",
  height: "",
  gender: "",
  email: "",
}

const loginValidationSchema = yup.object().shape({
  password: yup.string().required("Password is required").min(4),
  age: yup
    .number()
    .min(0, "min 0")
    .max(99, "max 99")
    .required("Age is required"),
  weight: yup.number().min(0, "min 0").required("Weight is required"),
  height: yup.number().min(0, "min 0").required("Height is required"),
  gender: yup.string().required("Gender is required").oneOf(["Male", "Female"]),
  email: yup.string().email().required("Email is required"),
})

export function Registration({ navigation }: Props) {
  const [selectedIndex, setSelectedIndex] = useState()
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 15,
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("SUCCESS")
          navigation.navigate('Questions')
        }}
        validationSchema={loginValidationSchema}
      >
        {(props) => (
          <View style={{ width: "100%", maxWidth: 500 }}>
            <Input
              placeholder="Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
            />
            <Input
              placeholder="Password"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
            />
            <Input
              placeholder="Age"
              onChangeText={props.handleChange("age")}
              value={props.values.age}
              keyboardType="numeric"
            />
            <Input
              placeholder="Weight (kg)"
              onChangeText={props.handleChange("weight")}
              value={props.values.weight}
              keyboardType="numeric"
            />
            <Input
              placeholder="Height (cm)"
              onChangeText={props.handleChange("height")}
              value={props.values.height}
              keyboardType="numeric"
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Gender
            </Text>
            <ButtonGroup
              buttons={["Male", "Female"]}
              selectedIndex={selectedIndex}
              onPress={(value) => {
                setSelectedIndex(value)
                const a = ["Male", "Female"][value]
                props.setFieldValue("gender", a)
                console.log(props.values)
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginHorizontal: 10,
              }}
            >
              <Button
                onPress={() => {
                  console.log(props.values)
                  props.handleSubmit()
                }}
                type="clear"
                size="sm"
                icon={{name:'arrow-forward', type:'ionicon', color: 'rgb(32, 137, 220)'}}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}
