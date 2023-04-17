import { Button, ButtonGroup, Dialog, Input, Overlay, Text } from "@rneui/themed"
import { Formik } from "formik"
import { View } from "react-native"
import * as yup from "yup"
import React, { Dispatch, SetStateAction, useState } from "react"
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group"

const initialValues = {
  password: "",
  age: "",
  weight: "",
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
  gender: yup.string().required("Gender is required").oneOf(["Male", "Female"]),
  email: yup.string().email().required("Email is required"),
})

export function SignUpDialog({
  visible,
  setVisible,
}: {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}) {
  const [successState, setSuccessState] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState()
  if (successState) {
    return (
      <Dialog isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
        <Text h4>Success</Text>
      </Dialog>
    )
  }
  return (
    <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)} fullScreen overlayStyle={{display: 'flex', justifyContent: 'center', padding: 15}}>
      <Dialog.Title title="Sign Up" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            setSuccessState(true)
            console.log("SUCCESS")
          }}
          validationSchema={loginValidationSchema}
        >
          {(props) => (
            <View style={{width: '100%', maxWidth: 500}}>
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
                placeholder="Weight"
                onChangeText={props.handleChange("weight")}
                value={props.values.weight}
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
              <ButtonGroup buttons={['Male', 'Female']} 
                selectedIndex={selectedIndex} onPress={(value)=>{
                  setSelectedIndex(value)
                  const a = (['Male', 'Female'])[value]
                  props.setFieldValue('gender', a)
                  console.log(props.values)
                }}
              />  
              <Button
                onPress={() => {
                  console.log(props.values)
                  props.handleSubmit()
                }}
                title={"CONFIRM"}
                type="solid"
                buttonStyle={{marginHorizontal: 10, marginTop:10}}
              />
              <Button
                onPress={() => setVisible(!visible)}
                title={"CANCEL"}
                type="clear"
                buttonStyle={{marginHorizontal: 10}}
                titleStyle={{color: 'red'}}
              />
            </View>
          )}
        </Formik>
      </View>
    </Overlay>
  )
}
