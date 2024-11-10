import React from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
interface FileIconProps {
    item: {
      name: string;
      type: number;
      id: number;
    };
    navigation:any;
  }
  

const FileIcon = ({ item,navigation }: FileIconProps) => {
    return (
        <TouchableOpacity
        style={styles.fileItem}
        onPress={() => navigation.navigate(item.type===1?"note":item.type===2?"checklist":"todo",{id:item.id,name:item.name})} // Використовуємо navigation.navigate
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>{item.type===1?"note":item.type===2?"checklist":"todo"}</Text>
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
        width: "46%"
    },
    itemName: {
        color: "#323232",
        fontSize: 15,
        padding: 0,
        height: 25,
        lineHeight:25,
        fontFamily: "Kadwa"
    },
    itemType: {
        lineHeight:20,
        height:25,
        color: "#323232",
        fontFamily: "Kadwa",
        fontSize: 12,
    }
});
export default FileIcon
