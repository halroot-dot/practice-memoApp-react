import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (text, createdAt) => {
  const key = `${createdAt}`; // (2)
  // (3)
  const value = JSON.stringify({
    text,
    createdAt,
  });

  await AsyncStorage.setItem(key, value); // (1)
};

export const loadAll = async () => {
  const keys = await AsyncStorage.getAllKeys(); // (1)
  keys.sort(); // (2)
  const entryList = await AsyncStorage.multiGet(keys); // (3)
  console.log(entryList);
  return entryList.map((entry) => JSON.parse(entry[1])); // (4)
};
