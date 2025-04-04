import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Save Item: Error in saving key:${key} and value:${value} with error=  ${error}`);
  }
};

export const loadStateItems = async (key, loadState) => {
  try {
    const state = await AsyncStorage.getItem(key);
    if (state) {
      loadState(JSON.parse(state));
    }
  } catch (error) {
    console.error(`Locad State Item: Error in fetching local value for key:${key} with error=  ${error}`);
    return null;
  }
};

export const loadStateItem = async (key, loadState) => {
  try {
    const state = await AsyncStorage.getItem(key);
    if (state) {
      loadState(state);
    }
  } catch (error) {
    console.error(`Locad State Item: Error in fetching local value for key:${key} with error=  ${error}`);
    return null;
  }
};

export const getItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Get Item: Error in fetching local value for key:${key} with error=  ${error}`);
    return null;
  }
};
