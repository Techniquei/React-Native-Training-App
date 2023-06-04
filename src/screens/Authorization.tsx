import { Button } from "@rneui/base"
import { Icon, Input, Text } from "@rneui/themed"
import { Formik, useFormik } from "formik"
import React, { useEffect, useState } from "react"
import { TextInput, View, Alert } from "react-native"
import * as yup from "yup"
import { Ionicons } from "@expo/vector-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Props } from "../../App"
import { authorization } from "../api"
import { storeUserId, getStoreUserId } from "../store"
import alert from "../alert"


const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Введите почту").email("Неверный формат"),
  password: yup.string().required("Введите пароль"),
})

export function Authorization({ navigation }: Props) {
  useEffect(()=>{
    getStoreUserId().then((id)=>id ? navigation.navigate("Home") : null)
  }, [])
  const {mutateAsync, isLoading} = useMutation({
    mutationFn: authorization,
    onSettled: (data) => {
      if(data){
        storeUserId(data.id).then(()=>navigation.navigate("Home"))
      }else{
        alert("Неверная почта или пароль")
      }
    },
    mutationKey: 'auth'
  })
  async function loginHandler(values: any) {
    await mutateAsync(values)
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%", maxWidth: 300 }}>
        <Formik
          initialValues={{ email: "testmail@mail.ru", password: "password" }}
          onSubmit={loginHandler}
          validationSchema={loginValidationSchema}
        >
          {({ handleChange, values, touched, handleSubmit, errors }) => (
            <View>
              <Input
                placeholder="Email"
                onChangeText={handleChange("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={{ paddingHorizontal: 10, color: "red" }}>
                  {errors.email}
                </Text>
              )}
              <Input
                placeholder="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={{ paddingHorizontal: 10, color: "red" }}>
                  {errors.password}
                </Text>
              )}
              <Button
                onPress={handleSubmit}
                style={{ paddingHorizontal: 10 }}
                loading={isLoading}

                radius={10}
              >
                Войти
              </Button>
            </View>
          )}
        </Formik>
        <Button
          type="clear"
          onPress={() => navigation.navigate("SignUp")}
          style={{ paddingHorizontal: 10 }}
          titleStyle={{ color: "rgb(32, 137, 220)" }}
        >
          Создать аккаунт
        </Button>
        <Ionicons
          name="md-checkmark-circle"
          size={32}
          color="green"
          style={{ opacity: 0 }}
        />
      </View>
    </View>
  )
}
