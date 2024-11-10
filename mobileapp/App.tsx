import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header, StackNavigationProp } from '@react-navigation/stack';
import Home from './src/pages/home';
import CustomHeader from './src/homePageComp/header';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import FileHeader from './src/filePagesComponents/header';
import CheckList from './src/filepages/CheckList';
import ToDo from './src/filepages/ToDo';
import Note from './src/filepages/note';


const Stack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
  Home: undefined;
  note: { name: string; id: number; type: number };
  checklist: { name: string; id: number; type: number };
  todo: { name: string; id: number; type: number };
};


export default function App() {

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Kadwa': require('./fonts/Kadwa-Regular.ttf'),  // Шлях до вашого шрифта
      });
    };

    loadFonts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{
          header: () => <CustomHeader />,
        }} />
        <Stack.Screen
          name="note"
          component={Note}
          options={({ navigation }) => ({
            header: () => <FileHeader navigation={navigation} />, 
          })}
        />
        <Stack.Screen
          name="checklist"
          component={CheckList}
          options={({ navigation }) => ({
            header: () => <FileHeader navigation={navigation} />, 
          })}
        />
        <Stack.Screen
          name="todo"
          component={ToDo}
          options={({ navigation }) => ({
            header: () => <FileHeader navigation={navigation} />, 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}