import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider, ToggleButton} from 'react-native-paper';

import {MainScreen} from './src/MainScreen';
import {ComposeScreen} from './src/ComposeScreen';
import {EditScreen} from './src/EditScreen';
import {ContentsScreen} from './src/ContentsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              title: 'メモ帳',
            }}
          />
          <Stack.Screen
            name="Compose"
            component={ComposeScreen}
            options={{
              title: '作成',
            }}
          />
          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{
              title: '編集',
            }}
          />
          <Stack.Screen
            name="Contents"
            component={ContentsScreen}
            options={{
              title: 'Contents',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
