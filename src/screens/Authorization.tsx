import { Button } from "@rneui/base"
import { Icon, Input, Text } from "@rneui/themed"
import { Formik, useFormik } from "formik"
import React, { useState } from "react"
import { TextInput, View } from "react-native"
import * as yup from "yup"
import { SignUpDialog } from "../components/SignUpDialog"
import {Ionicons} from '@expo/vector-icons';

const loginValidationSchema = yup.object().shape({
  login: yup.string().required("Login is required"),
  password: yup.string().required("Password is required"),
})

export function Authorization({ navigation }) {
  const [dialogVisible, setDialogVisible]  = useState(false)
  function loginHandler(values: any) {
    console.log(values)
    navigation.navigate("Questions")
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%", maxWidth: 300}}>
        <Formik
          initialValues={{ login: "", password: "" }}
          onSubmit={loginHandler}
          validationSchema={loginValidationSchema}
        >
          {({handleChange, values, touched, handleSubmit, errors}) => (
            <View>
              <Input
                placeholder="Login"
                onChangeText={handleChange("login")}
                value={values.login}
              />
              {(errors.login && touched.login) && 
                <Text style={{paddingHorizontal: 10, color: 'red'}}>{errors.login}</Text>
              }
              <Input
                placeholder="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry
              />
              {(errors.password && touched.password) && 
                <Text style={{paddingHorizontal: 10, color: 'red'}}>{errors.password}</Text>
              }
              <Button
                onPress={handleSubmit}
                style={{paddingHorizontal: 10}}
              >
                Sign In
              </Button>
            </View>
          )}
        </Formik>
        <Button
          type="clear"
          onPress={() => setDialogVisible(true)}
          style={{paddingHorizontal: 10}}
        >
          Sign Up
        </Button>
        <Ionicons name='md-checkmark-circle' size={32} color='green' style={{opacity: 0}} />     
      </View>
      <SignUpDialog visible={dialogVisible} setVisible={setDialogVisible} />
    </View>
  )
}
