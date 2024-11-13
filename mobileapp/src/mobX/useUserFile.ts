import { makeAutoObservable } from "mobx";
import * as  SQLite from "expo-sqlite"
import { SQLiteAnyDatabase } from "expo-sqlite/build/NativeStatement";
const db = SQLite.openDatabaseSync("db");

interface UserFile {
    id: number;
    fileName: string;
    type: number;
}


interface Todo {
    id: number;
    todoFileId: number;
    text: string;
}
interface CheckList {
    id: number;
    todoFileId: number;
    caption: string;
}
interface Note {
    id: number;
    userFileId: number;
    text: string;
}
interface Diary {
    id: number;
    userFileId: number;
    text: string;
    date: string;
}
class UseUserFile {
    fileData: Note | any = {};
    files: UserFile[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    updateFiles() {
        this.files = db.getAllSync(
            "SELECT * FROM userFiles WHERE fileName IS NOT ?",
            ['MAINDIARY'])
        this.files = [...this.files, {
            id: -1,
            fileName: 'Custom Component',
            type: 0
        }]
    }

    GetFile(fileName: string, type: number, id: number) {
        const checkQuery = "SELECT * FROM sheets WHERE userFileId = ?";
        const result = db.getFirstSync(checkQuery, [id]);
        if (result) {
            this.fileData = result;
            console.log(this.fileData);
        } else {
            const insertQuery = "INSERT INTO sheets (userFileId, text) VALUES (?, ?)";
            db.runSync(insertQuery, [id, ""]);
            this.fileData = {};
        }

    }
    EditFile(fileName: string, type: number, id: number, text: string) {
        if (text) {
            const checkQuery = "SELECT * FROM sheets WHERE userFileId = ?";
            const result = db.getFirstSync(checkQuery, [id]);
            if (result) {
                const updateQuery = "UPDATE sheets SET text = ? WHERE userFileId = ?";
                db.runSync(updateQuery, [text, id]);
                console.log(`Updated sheets with userFileId: ${id} to text: ${text}`);
            } else {
                const insertQuery = "INSERT INTO sheets (userFileId, text) VALUES (?, ?)";
                db.runSync(insertQuery, [id, text]);
                console.log(`Created new sheets with userFileId: ${id} and text: ${text}`);
            }
        }
    }

    addNewUserFile(type: number, fileName: string) {
        const query = "INSERT INTO userFiles (type, fileName) VALUES (?, ?)";
        try {
            db.runSync(query, [type, fileName]);
            console.log(`file ${fileName} was added`);
            this.updateFiles()
            return 1
        } catch (error) {
            console.error("Error adding file: ", error);
            return 0
        }
    }

}

const useUserFile = new UseUserFile();
export default useUserFile;



