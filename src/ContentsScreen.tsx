import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Card, Button, Title, Paragraph} from 'react-native-paper';
import format from 'date-fns/format';

import {remove} from './store';

export function ContentsScreen({route, navigation}) {
  const item = route.params;
  console.log('input is ' + item.text + ' and ' + item.createdAt);
  console.log('input (JSON) is ' + JSON.stringify(item));

  const onPressDelete = () => {
    Alert.alert('本当に削除して良いですか?', 'データは復旧できなくなります', [
      {
        text: 'Ok',
        onPress: async () => {
          await remove(item.createdAt);
          navigation.goBack();
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>{item.text}</Title>
          <Paragraph>
            作成日時: {format(item.createdAt, 'yyyy.MM.dd(EEE) HH:mm')}
          </Paragraph>
        </Card.Content>
        <Card.Actions>
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
