import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {update} from './store';

export const EditScreen = ({route, navigation}) => {
  const item = route.params;
  const [text, setText] = useState(item.text);

  console.log('edit is ' + item.text + ' and ' + item.createdTime);
  console.log('edit (JSON) is ' + JSON.stringify(item));

  const onPressSave = async () => {
    await update(text, item.createdTime, Date.now());
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{marginBottom: 16}}
        mode="outlined"
        placeholder={item.text}
        multiline
        onChangeText={(text) => setText(text)}
        defaultValue={item.text}
      />
      <Button mode="contained" onPress={onPressSave}>
        保存
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
