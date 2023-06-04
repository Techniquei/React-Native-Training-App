import { Button, ButtonGroup, Image, Input, Text, Icon } from "@rneui/themed"
import { Formik } from "formik"
import React, { useState } from "react"
import { View, ScrollView, TouchableOpacity } from "react-native"
import * as yup from "yup"
import { Props } from "../../App"
import { goalByIndex, musclesList } from "./QuestionPage"
import { registration } from "../api"
import { useMutation } from "@tanstack/react-query"
import alert from "../alert"

const initialValues = {
  password: "",
  age: "",
  weight: "",
  height: "",
  sex: "",
  email: "",
  name: "",
  surname: "",
  lastName: "",
  currentLevel: 5,
  aim: 1,
  trainHands: false,
  trainLegs: false,
  trainBack: false,
  trainPress: false,
  trainChest: false,
  trainShoulders: false,
}

const loginValidationSchema = yup.object().shape({
  password: yup.string().required("Введите пароль").min(4),
  age: yup
    .number()
    .min(0, "Возраст не может быть отрицательным")
    .max(99, "Возраст  не может быть больше 99")
    .required("Введите возраст"),
  weight: yup.number().min(0, "min 0").required("Введите вес"),
  height: yup.number().min(0, "min 0").required("Введите рост"),
  sex: yup.string().required("Выберите пол").oneOf(["m", "w"]),
  email: yup.string().email().required("Введите почту"),
  name: yup.string().required("Введите имя"),
  surname: yup.string().required("Введите фамилию"),
  lastName: yup.string().required("Введите отчество"),
})

export function Registration({ navigation }: Props) {
  const [selectedIndex, setSelectedIndex] = useState()
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: registration,
    onSettled: (data) => {
      if (data == "ok") {
        navigation.navigate("Authorization")
      }else{
        alert('Уже существует аккаунт с этой почтой')
      }
    },
    mutationKey: "signup",
  })

  async function registrationHandler(values: any) {
    await mutateAsync(values)
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 25,
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={registrationHandler}
        validationSchema={loginValidationSchema}
      >
        {(props) => (
          <View
            style={{
              width: "100%",
              maxWidth: 500,
              gap: 10,
              paddingVertical: 10,
            }}
          >
            <Input
              placeholder="Почта"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              errorMessage={props.touched.email ? props.errors.email  : ''}
            />
            <Input
              placeholder="Пароль"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              errorMessage={props.touched.password ? props.errors.password : ''}
            />
            <Input
              placeholder="Имя"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
              errorMessage={props.touched.name ? props.errors.name : ''}
            />
            <Input
              placeholder="Фамилия"
              onChangeText={props.handleChange("surname")}
              value={props.values.surname}
              errorMessage={props.touched.surname ? props.errors.surname : ''}
            />
            <Input
              placeholder="Отчество"
              onChangeText={props.handleChange("lastName")}
              value={props.values.lastName}
              errorMessage={props.touched.lastName ? props.errors.lastName : ''}
            />
            <Input
              placeholder="Возраст"
              onChangeText={props.handleChange("age")}
              value={props.values.age}
              keyboardType="numeric"
              errorMessage={props.touched.age ? props.errors.age : ''}

            />
            <Input
              placeholder="Вес (кг)"
              onChangeText={props.handleChange("weight")}
              value={props.values.weight}
              keyboardType="numeric"
              errorMessage={props.touched.weight ? props.errors.weight : ''}
            />
            <Input
              placeholder="Рост (см)"
              onChangeText={props.handleChange("height")}
              value={props.values.height}
              keyboardType="numeric"
              errorMessage={props.touched.height ? props.errors.height : ''}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Пол
            </Text>
            <View style={{ alignItems: "center" }}>
              <ButtonGroup
                buttons={["Мужской", "Женский"]}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                  setSelectedIndex(value)
                  const a = ["m", "w"][value]
                  props.setFieldValue("sex", a)
                  console.log(props.values)
                }}
                containerStyle={{ borderRadius: 10, width: 290 }}
              />
              {props.errors.sex && props.touched.sex && (
                <Text
                  style={{ paddingHorizontal: 20, color: "red", fontSize: 12 }}
                >
                  {props.errors.sex}
                </Text>
              )}
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {'Ваша цель: ' + goalByIndex(props.values.aim)}
              </Text>
              <ButtonGroup
                buttons={[
                  <Icon
                    name="leaf"
                    type="ionicon"
                    color="lawngreen"
                    size={80}
                  />,
                  <Icon name="heart" type="ionicon" color="salmon" size={80} />,
                  <Icon name="barbell" type="ionicon" size={80} />,
                ]}
                selectedIndex={props.values.aim}
                onPress={(value) => {
                  props.setFieldValue("aim", value)
                }}
                selectedButtonStyle={{
                  borderRadius: 10,
                  borderWidth: 5,
                  borderColor: "rgb(32, 137, 220)",
                  backgroundColor: "white",
                }}
                buttonStyle={{ width: 90, height: 90 }}
                buttonContainerStyle={{
                  width: 90,
                  height: 90,
                  borderWidth: 0,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
                containerStyle={{
                  gap: 10,
                  height: 90,
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "row",
                  borderWidth: 0,
                  width: 290,
                }}
              />
            </View>
            {props.values.aim == 2 ? (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginBottom: 5,
                  }}
                >
                  Выберите мышцы
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    maxWidth: 300,
                    gap: 10,
                  }}
                >
                  {musclesList.map((item, index) => (
                    <TouchableOpacity
                      key={item.name + index}
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        borderColor: props.values[item.name]
                          ? "rgb(32, 137, 220)"
                          : "white",
                        borderWidth: 5,
                        borderRadius: 10,
                      }}
                      onPress={() =>
                        props.setFieldValue(item.name, !props.values[item.name])
                      }
                    >
                      <Image
                        source={{ uri: item.Image }}
                        style={{
                          width: 60,
                          height: 60,
                          tintColor: "black",
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              ""
            )}

            <Button
              style={{ width: 202, alignSelf: "center" }}
              radius={10}
              onPress={() => {
                props.handleSubmit()
              }}
              loading={isLoading}
              title="Создать аккаунт"
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}
