import React, { useRef, useState } from 'react'
import { Animated, Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Ionicons from '@expo/vector-icons/Ionicons';
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
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(new Animated.Value(50));
  const widthAnim = useRef(new Animated.Value(0.1)).current;
  const handleChangeWidth = () => {
    setShow(!show)
    Animated.timing(widthAnim, {
      toValue: show ? 0 : 0.8,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
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
      <Pressable style={{ alignItems: "flex-end" }}>
        <Animated.View style={[
          styles.optionsCont,
          {
            width: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}>
          <TouchableOpacity style={{ alignItems: "center",justifyContent:'center' }} >
            <MaterialIcons name="delete" size={30} color="#323232" />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center",justifyContent:'center'}} >
            <Ionicons name="pencil-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: "center",justifyContent:'center'}} >
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../assets/exportalbl.png")} />
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
        <TouchableOpacity style={{padding:10, position: "absolute", alignItems: "center",justifyContent:'center'}} onPress={handleChangeWidth} >
          <SimpleLineIcons name="options-vertical" size={20} color="black" />
        </TouchableOpacity>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  optionsCont: {
    flexDirection: "row",
    alignItems: "center",
    width:0,
    overflow: "hidden",
    justifyContent: "space-around",
    borderRadius: 10
  },
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
