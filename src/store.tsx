import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = 'https://hogehoge.amazonaws.com/dev/src/handler';

const baseRequest = axios.create({
  baseURL: URL,
  responseType: 'json',
});

export const add = async (text, createdTime) => {
  if (URL != '') {
    await baseRequest.post('/', {
      createdTime: createdTime,
      updatedTime: createdTime,
      text: text,
    });
  } else {
    const key = `${createdTime}`;
    const updatedTime = createdTime;

    const value = JSON.stringify({
      text,
      createdTime,
      updatedTime,
    });

    await AsyncStorage.setItem(key, value);
  }
};

export const update = async (text, createdTime, updatedTime) => {
  if (URL != '') {
    await baseRequest
      .post('/', {
        createdTime: createdTime,
        updatedTime: updatedTime,
        text: text,
      })
      .catch((err) => {
        return err.response;
      });
  } else {
    const key = `${createdTime}`;

    const value = JSON.stringify({
      text,
      createdTime,
      updatedTime,
    });

    await AsyncStorage.mergeItem(key, value);
  }
};

export const remove = async (createdTime) => {
  if (URL != '') {
    await baseRequest
      .delete('/', {data: {createdTime: createdTime}})
      .then((res) => {
        console.log(res.data);
      });
  } else {
    const key = `${createdTime}`;

    await AsyncStorage.removeItem(key);
    console.log('remove: ' + key);
  }
};

export const loadAll = async () => {
  if (URL != '') {
    const entryLists = await (await baseRequest.get('/')).data;
    console.log('entryLists from URL is {}', entryLists);
    return entryLists;
  } else {
    const keys = await AsyncStorage.getAllKeys();
    keys.sort();
    const entryList = await AsyncStorage.multiGet(keys);
    console.log('entryList is {}', entryList);
    return entryList.map((entry) => JSON.parse(entry[1]));
  }
};
