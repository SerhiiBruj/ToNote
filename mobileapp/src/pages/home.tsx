import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView, Button } from 'react-native';
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from 'react';
import CustomHeader from '../homePageComp/header';
import DiaryIcon from '../homePageComp/DiaryIcon';
import ListOfFiles from '../homePageComp/ListOfFiles';
import { StackNavigationProp } from '@react-navigation/stack'; 
import useUserFile from '../mobX/useUserFile';

const db = SQLite.openDatabaseSync("db");
export default function Home({navigation}:{navigation:StackNavigationProp<any,any>}) {

  useEffect(()=>{
    useUserFile.updateFiles()
  },[])
  return (
    <View
      style={styles.container}>
      <ListOfFiles navigation={navigation}/>
      <DiaryIcon  navigation={navigation} />
      <StatusBar style={"inverted"} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1E1E1E',
    paddingBottom: 20
  },
});