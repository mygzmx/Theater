import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useStorage () {

  const getItem = async (key: string) => {
    try {
      return await AsyncStorage.getItem(`@JC_${key}`)
    } catch(e) {
      return e;
    }
  }

  const setItem = async (key: string, value: string) => {
    try {
      return await AsyncStorage.setItem(`@JC_${key}`, value)
    } catch(e) {
      return e;
    }
  }

  const removeItem = async (key: string) => {
    try {
      return await AsyncStorage.removeItem(`@JC_${key}`)
    } catch(e) {
      return e;
    }
  }

  const clear = async () => {
    try {
      return await AsyncStorage.clear()
    } catch(e) {
      return e;
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  }
}
