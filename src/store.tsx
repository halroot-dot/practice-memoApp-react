import AsyncStorage from '@react-native-async-storage/async-storage';

export const add = async (text, createdAt) => {
  const key = `${createdAt}`;

  const value = JSON.stringify({
    text,
    createdAt,
  });

  await AsyncStorage.setItem(key, value);
};

export const loadAll = async () => {
  const keys = await AsyncStorage.getAllKeys();
  keys.sort();
  const entryList = await AsyncStorage.multiGet(keys);
  console.log(entryList);
  return entryList.map((entry) => JSON.parse(entry[1]));
};

export const remove = async (createdAt) => {
  const key = `${createdAt}`;

  await AsyncStorage.removeItem(key);

  console.log('remove: ' + key);
};
