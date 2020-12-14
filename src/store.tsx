import AsyncStorage from '@react-native-async-storage/async-storage';

export const add = async (text, createdTime) => {
  const key = `${createdTime}`;
  const updatedTime = createdTime;

  const value = JSON.stringify({
    text,
    createdTime,
    updatedTime,
  });

  await AsyncStorage.setItem(key, value);
};

export const update = async (text, createdTime, updatedTime) => {
  const key = `${createdTime}`;

  const value = JSON.stringify({
    text,
    createdTime,
    updatedTime,
  });

  await AsyncStorage.mergeItem(key, value);
};

export const remove = async (createdTime) => {
  const key = `${createdTime}`;

  await AsyncStorage.removeItem(key);
  console.log('remove: ' + key);
};

export const loadAll = async () => {
  const keys = await AsyncStorage.getAllKeys();
  keys.sort();
  const entryList = await AsyncStorage.multiGet(keys);
  console.log(entryList);
  return entryList.map((entry) => JSON.parse(entry[1]));
};
