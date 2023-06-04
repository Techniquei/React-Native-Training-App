import AsyncStorage from "@react-native-async-storage/async-storage"

export async function storeUserId(id : number) {
  try {
    await AsyncStorage.setItem("@profileId", String(id))
    return id
  } catch (e) {
    console.log(e)
  }
}

export async function getStoreUserId() {
  try {
    const value = await AsyncStorage.getItem('@profileId')
    if(value !== null) {
      return +value
    }
  } catch (e) {
    console.log(e)
  }
}

export async function deleteUserId() {
  try {
    await AsyncStorage.removeItem('@profileId')
  } catch (e) {
    console.log(e)
  }
}

export async function storeToken(token : string) {
  try {
    await AsyncStorage.setItem("@token", token)
  } catch (e) {
    console.log(e)
  }
}

export async function getToken() {
  try {
    const value = await AsyncStorage.getItem('@token')
    console.log(value)
    if(value !== null) {
      return value
    }
  } catch (e) {
    console.log(e)
  }
}

export async function deleteToken() {
  try {
    await AsyncStorage.removeItem('@token')
  } catch (e) {
    console.log(e)
  }
}

export async function deleteTokenAndId() {
  try {
    await AsyncStorage.removeItem('@profileId')
    await AsyncStorage.removeItem('@token')
  } catch (e) {
    console.log(e)
  }
}
