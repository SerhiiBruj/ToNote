import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import * as SQLite from "expo-sqlite";
import FileIcon from './fileIcon';
import { StackNavigationProp } from '@react-navigation/stack';
import useUserFile from '../mobX/useUserFile';
import { observer } from 'mobx-react';
import AddFileIcon from './addFileIcon';

interface FileItem {
    id: number;
    fileName: string;
    type: number;
}



const ListOfFiles = observer(({ navigation }: { navigation: StackNavigationProp<any, any> }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState<FileItem[]>([]);
  
      

      useEffect(() => {
        setFiles(useUserFile.files); 
        setIsLoading(false);
    }, [useUserFile.files]); 

 
    if (isLoading) {
      return (
        <View style={styles.listWrapper}>
          <Text style={{ color: '#fff' }}>Loading...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.listWrapper}>
        <FlatList
          data={files}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: FileItem }) => {
            if (item.id === -1) {
              return <AddFileIcon/>;
            }
            return <FileIcon navigation={navigation} item={item} />;
          }}
        />
      </View>
    );
  });
const styles = StyleSheet.create({
    listWrapper: {
        backgroundColor: '#3B3B3B',
        height: 350,
        justifyContent: 'center',
        marginTop: 50,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        gap: 20,
        padding: 20,
    },
})

export default ListOfFiles;




    // useEffect(() => {
    //     console.log("Starting database initialization...");
    //     const createAndInsertData = () => {
    //         if (db) {
    //             try {
    //                 db.withTransactionSync(() => {
    //                     console.log("Creating table if not exists...");
    //                     db.execSync(
    //                         "CREATE TABLE IF NOT EXISTS useUserFile (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(10), type TINYINT)"
    //                     );
    
    //                     console.log("Fetching records from useUserFile...");
    //                     let res: { name: string, id: number, type: number }[] | any = db.getAllSync("SELECT * FROM useUserFile");
    
    //                     console.log("Current records:", res);
    
    //                     if (res.length < 1) {
    //                         console.log("Inserting initial data into useUserFile...");
    //                         db.runSync("INSERT INTO useUserFile (name, type) VALUES (?, ?)", ['noteTest', 1]);
    //                         db.runSync("INSERT INTO useUserFile (name, type) VALUES (?, ?)", ['todoTest', 3]);
    //                         db.runSync("INSERT INTO useUserFile (name, type) VALUES (?, ?)", ['checklistTest', 2]);
    
    //                         console.log("Data inserted successfully.");
                            
    //                         // Знову отримуємо записи після вставки
    //                         res = db.getAllSync("SELECT * FROM useUserFile");
    //                         console.log("Records after insertion:", res);
    //                     }
    
    //                     // Встановлюємо файли в стан, якщо є записи
    //                     setFiles(res);
    //                     setIsLoading(false);
    //                 });
    //             } catch (error) {
    //                 console.error("Error during database transaction:", error);
    //             }
    //         } else {
    //             console.error("Database connection is null.");
    //         }
    //     };
    
    //     createAndInsertData();
    // }, []);