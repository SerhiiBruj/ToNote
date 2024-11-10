import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import * as SQLite from "expo-sqlite";
import FileIcon from './fileIcon';
import { StackNavigationProp } from '@react-navigation/stack'; 

// Відкриваємо базу даних
const db = SQLite.openDatabaseSync("db");



interface FileItem {
    id: number;
    name: string;
    type: number;
}


const ListOfFiles = ({navigation}:{navigation:StackNavigationProp<any,any>}) => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("object")
        const createAndInsertData = () => {
            try {
                db.withTransactionSync(() => {
                    db.execSync(
                        "CREATE TABLE IF NOT EXISTS userFiles (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(10), type TINYINT)"
                    );

                    let res: { name: string, id: number, type: number }[] | any = db.getAllSync("SELECT * FROM userFiles");

                    if (res.length < 1) {
                        db.runSync(
                            "INSERT INTO userFiles (name, type) VALUES (?, ?)",
                            ['noteTest', 1]
                        );
                        db.runSync(
                            "INSERT INTO userFiles (name, type) VALUES (?, ?)",
                            ['todoTest', 3]
                        );
                        db.runSync(
                            "INSERT INTO userFiles (name, type) VALUES (?, ?)",
                            ['checklistTest', 2]
                        );
                    } 
                    // else {
                    //     db.execSync("DELETE FROM userFiles");
                    // }

                    res = db.getAllSync("SELECT * FROM userFiles");
                    setFiles(res);
                    setIsLoading(false);
                });
            } catch (er) {
                console.error("Error during database transaction:", er);
            }
        };

        createAndInsertData();
    }, []);

    if (isLoading) {
        return <Text style={{ color: '#fff' }}>Loading...</Text>;
    }

    return (
        <View style={styles.listWrapper}>
            <FlatList
                data={files}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: { item: FileItem }) => (
                    <FileIcon navigation={navigation} item={item}/>
                )}
            />
        </View>
    );
};

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
});

export default ListOfFiles;
