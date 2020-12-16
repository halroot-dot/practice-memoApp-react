import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {List} from 'react-native-paper';

import format from 'date-fns/format';
import {FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {loadAll} from './store';

type item = {
  text: string;
  createdTime: number;
  updatedTime: number;
};

export const MainScreen = () => {
  const navigation = useNavigation();
  const [memos, setMemos] = useState<item[]>([]);
  const [memosExtra, setMemosExtra] = useState(true);
  const [sortState, setSortState] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const newMemos = await loadAll();
      setMemos(newMemos);
      console.log('newMemos is {}', newMemos);
    };

    const unsubscribe = navigation.addListener('focus', initialize);

    console.log('render useeffect navigation');

    return unsubscribe;
  }, [navigation]);

  const onPressAdd = () => {
    navigation.navigate('Compose');
  };

  const onPressToggleSort = () => {
    setSortState(!sortState);
  };

  useEffect(() => {
    const sortCreatedTime = (e: item[]) => {
      return e.sort((a, b) => a.createdTime - b.createdTime);
    };

    const sortUpdatedTime = (e: item[]) => {
      return e.sort((a, b) => a.updatedTime - b.updatedTime);
    };

    setMemosExtra(!memosExtra);

    sortState
      ? setMemos(sortCreatedTime(memos))
      : setMemos(sortUpdatedTime(memos));
    return;
  }, [sortState, memos]);

  console.log('memos is {}', memos);
  console.log('sortState is {}', sortState);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos}
        extraData={memosExtra}
        keyExtractor={(item) => `${item.createdTime}`}
        renderItem={({item}) => (
          <List.Item
            title={item.text}
            titleNumberOfLines={5}
            description={`作成日時: ${format(
              item.createdTime,
              'yyyy.MM.dd HH:mm',
            )}
              更新日時: ${format(item.updatedTime, 'yyyy.MM.dd HH:mm')}`}
            descriptionStyle={{textAlign: 'right'}}
            onPress={() => navigation.navigate('Contents', item)}
          />
        )}
      />
      <FAB style={styles.floatButton} icon="plus" onPress={onPressAdd} />
      <FAB
        style={styles.sortButton}
        icon={sortState ? 'clock-time-four-outline' : 'minus'}
        onPress={onPressToggleSort}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  floatButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'rgb(60, 116, 247)',
  },
  sortButton: {
    position: 'absolute',
    right: 80,
    bottom: 16,
    backgroundColor: 'black',
  },
});
