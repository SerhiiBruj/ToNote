import React from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
interface FileIconProps {
  item: {
    fileName: string;
    type: number;
    id: number;
  };
  navigation: any;
}
/* 
type 1 = note 
type 2 = todo 
type 3 = checklist 
type 4 = table 
type 5 = dashboard 
type 6 = diary 
*/

const FileIcon = ({ item, navigation }: FileIconProps) => {
  return (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={() => navigation.navigate(
        item.type === 1 ? "note"
          : item.type === 2 ? "todo"
            : item.type === 3 ? "checklist"
              : item.type === 4 ? "table"
                : item.type === 5 ? "dashboard"
                  : "diary",
        { id: item.id, name: item.fileName })}
    >
      <View>

        <Text style={styles.itemName}>{item.fileName}</Text>
        <Text style={styles.itemType}>{item.type === 1 ? "note"
          : item.type === 2 ? "todo"
            : item.type === 3 ? "checklist"
              : item.type === 4 ? "table"
                : item.type === 5 ? "dashboard"
                  : "diary"}</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={30} color="#323232" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  fileItem: {
    padding: 10,
    height: 130,
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#D9D9D9",
    width: "46%",
    justifyContent: "space-between"
  },
  itemName: {
    color: "#323232",
    fontSize: 15,
    padding: 0,
    height: 25,
    lineHeight: 25,
    fontFamily: "Kadwa"
  },
  itemType: {
    lineHeight: 20,
    height: 25,
    color: "#323232",
    fontFamily: "Kadwa",
    fontSize: 12,
  }
});
export default FileIcon
