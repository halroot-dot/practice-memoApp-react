import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Card, Button, Paragraph} from 'react-native-paper';
import format from 'date-fns/format';

import {remove} from './store';

export function ContentsScreen({route, navigation}) {
  const item = route.params;
  const subtitle = format(item.createdTime, 'yyyy.MM.dd(EEE) HH:mm');
  console.log('input is ' + item.text + ' and ' + item.createdTime);
  console.log('input (JSON) is ' + JSON.stringify(item));

  const onPressDelete = () => {
    Alert.alert('本当に削除して良いですか?', 'データは復旧できなくなります', [
      {
        text: 'Ok',
        onPress: async () => {
          await remove(item.createdTime);
          navigation.goBack();
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  const onPressEdit = () => {
    navigation.navigate('Edit', item);
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title={item.text} subtitle={'作成日 : ' + subtitle} />
        <Card.Content>
          <Paragraph>{item.text}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={onPressEdit}>edit</Button>
          <Button onPress={onPressDelete}>delete</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
