import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {List} from 'react-native-paper';

import format from 'date-fns/format';
import {FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {loadAll} from './store';

export const MainScreen = () => {
  const navigation = useNavigation();
  const [memos, setMemos] = useState([]);
  const [sortState, setSortState] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const newMemos = await loadAll();
      setMemos(newMemos);
    };

    const unsubscribe = navigation.addListener('focus', initialize);

    return unsubscribe;
  }, [navigation]);

  const onPressAdd = () => {
    navigation.navigate('Compose');
  };
  const onPressToggleSort = () => {
    setSortState(!sortState);
  };

  console.log('memos is {}', memos);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos.sort(function (a, b) {
          const cal = sortState
            ? a.createdTime - b.createdTime
            : a.updatedTime - b.updatedTime;
          if (cal > 0) {
            return 1;
          } else {
            return -1;
          }
        })}
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
        icon={sortState ? 'clock-time-four-outline' : 'clock-time-four'}
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
