import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header, StackNavigationProp } from '@react-navigation/stack';
import Home from './src/pages/home';
import CustomHeader from './src/homePageComp/header';
import { createContext, useContext, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import FileHeader from './src/filePagesComponents/header';
import CheckList from './src/filepages/CheckList';
import ToDo from './src/filepages/ToDo';
import Note from './src/filepages/note';
import * as SQLite from "expo-sqlite";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Image, View } from 'react-native';
import Diary from './src/filepages/diary';

/* 
type 1 = note 
type 2 = todo 
type 3 = checklist 
type 4 = table 
type 5 = dashboard 
type 6 = diary 
*/

type RootStackParamList = {
  Home: undefined;
  note: { name: string; id: number; type: number };
  checklist: { name: string; id: number; type: number };
  todo: { name: string; id: number; type: number };
  diary: { name: string; id: number; type: number };
};


const Stack = createStackNavigator<RootStackParamList>();

// const getFonts = () =>
//   Font.loadAsync({
//     "Kadwa": require("./fonts/Kadwa-Regular.ttf"),
//   });


export default function App() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  useEffect(() => {
    const database = SQLite.openDatabaseSync("db");

    const openDatabase = async () => {
      // await getFonts();
      try {
        database.execSync("DROP TABLE IF EXISTS userFiles");
        database.execSync("DROP TABLE IF EXISTS todos");
        database.execSync("DROP TABLE IF EXISTS checklists");
        database.execSync("DROP TABLE IF EXISTS checklistItems");
        database.execSync("DROP TABLE IF EXISTS notes");
        database.execSync("DROP TABLE IF EXISTS diaries");
        database.execSync("DROP TABLE IF EXISTS sheets");


        database.execSync(`
          CREATE TABLE IF NOT EXISTS userFiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fileName VARCHAR(255) UNIQUE,
            type TINYINT
            );
          CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            todoFileId INTEGER,
            text TEXT,
            FOREIGN KEY (todoFileId) REFERENCES userFiles(id)
            );
            CREATE TABLE IF NOT EXISTS checklists (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              todoFileId INTEGER,
              caption VARCHAR(255),
            FOREIGN KEY (todoFileId) REFERENCES userFiles(id)
            );
            CREATE TABLE IF NOT EXISTS checklistItems (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              checklistId INTEGER,
              statement TEXT,
              done BOOLEAN,
              FOREIGN KEY (checklistId) REFERENCES checklists(id)
              );
              CREATE TABLE IF NOT EXISTS sheets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userFileId INTEGER,
                text TEXT,
                date DATE,
                FOREIGN KEY (userFileId) REFERENCES userFiles(id)
                );
                `);

        database.execSync(`INSERT INTO userFiles (fileName, type) VALUES ("MAINDIARY", 6)`);


        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    openDatabase();

    return () => {
      if (db) {
        db.closeSync()
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ header: () => <CustomHeader /> }} />
        <Stack.Screen name="note" component={Note} options={({ navigation }) => ({ header: () => <FileHeader navigation={navigation} /> })} />
        <Stack.Screen name="checklist" component={CheckList} options={({ navigation }) => ({ header: () => <FileHeader navigation={navigation} /> })} />
        <Stack.Screen name="todo" component={ToDo} options={({ navigation }) => ({ header: () => <FileHeader navigation={navigation} /> })} />
        <Stack.Screen name="diary" component={Diary} options={({ navigation }) => ({ header: () => <FileHeader navigation={navigation} /> })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoadingScreen = () => {
  return (
    <View
    >
      <Image source={require('./assets/loading.png')}
      />
    </View>
  );
};




// Очищаємо базу даних перед ініціалізацією
// database.execSync("DROP TABLE IF EXISTS userFiles");
// database.execSync("DROP TABLE IF EXISTS todos");
// database.execSync("DROP TABLE IF EXISTS checklists");
// database.execSync("DROP TABLE IF EXISTS checklistItems");
// database.execSync("DROP TABLE IF EXISTS notes");
// database.execSync("DROP TABLE IF EXISTS diaries");
// database.execSync(`INSERT INTO userFiles (fileName, type) VALUES ("MAINDIARY", 6)`);
// database.execSync(`INSERT INTO userFiles (fileName, type) VALUES ("help", 1)`);
// database.execSync(`INSERT INTO notes (text, userFileId) VALUES ("help", 2)`);
// console.log(database.getAllSync(`SELECT * FROM userFiles`))