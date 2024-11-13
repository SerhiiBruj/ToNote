import React, { useState } from 'react';
import { Animated, Pressable, Text, TextInput, View, StyleSheet, Button, Image, TouchableOpacity, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import useUserFile from '../mobX/useUserFile';

const AddFileIcon = () => {
    const [show, setShow] = useState(false);
    const [height, setHeight] = useState(new Animated.Value(50));
    const [fileData, setFileData] = useState<{ name: string, type: number }>({ name: "", type: 1 })

    const toggleHeight = () => {
        Animated.timing(height, {
            toValue: show ? 130 : 200,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setShow(!show);
    };

    const createNewFile = () => {
        console.log("creating new file")
        const res = useUserFile.addNewUserFile(fileData.type, fileData.name)
        if (res) {
            Alert.alert("file was created")
            useUserFile.updateFiles()
        } else {
            Alert.alert("Choose another name of the file")
        }

    }

    return (
        <Animated.View style={[styles.fileItem, { height }]}>
            <Pressable onPress={toggleHeight} style={styles.fileItemInner}>
                <Text style={styles.itemName}>Add</Text>
                {show && (
                    <View style={styles.inputsWrapper}>
                        <View>
                            <TextInput placeholderTextColor={"#323232"} placeholder="name" onChangeText={(value) => setFileData({ ...fileData, name: value })} value={fileData.name} style={styles.input} />
                            <DropdownType fileData={fileData} setFileData={setFileData} />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={createNewFile}
                        >
                            <Text style={styles.buttonText}>Create file</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    fileItem: {
        display: "flex",
        overflow: "hidden",
        padding: 10,
        borderRadius: 15,
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: "#D9D9D9",
        width: "46%",
        minHeight: 130,
        height: 130
    },
    fileItemInner: {
        height: "100%"
    },
    itemName: {
        fontSize: 18,
        color: "#323232",
        fontFamily: "Kadwa",
    },
    inputsWrapper: {
        display: "flex",
        overflow: "hidden",
        padding: 10,
        borderRadius: 15,
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: "#D9D9D9",
        minHeight: 130,
        height: "90%",
    },
    input: {
        height: 40,
        borderColor: '#000',
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#8D8D8D",
        padding: 10,
        color: "#323232",
        fontFamily: "Kadwa",
        borderRadius: 5,

    },
    button: {
        backgroundColor: '#323232',
        width: "80%",
        marginLeft: "25%",
        borderRadius: 10,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'gray',
        fontSize: 14,
    },
});

export default AddFileIcon;
/*
type 1 = note 
type 2 = todo 
type 3 = checklist 
type 4 = table 
type 5 = dashboard 
type 6 = diary 
*/

const fileTypes = [
    { title: 'note', },
    { title: 'todo', },
    { title: 'checklist', },
    { title: 'table', },
    { title: 'dashboard' },
    { title: 'diary', },
];
const DropdownType = ({ setFileData, fileData }: { setFileData: any, fileData: { name: string, type: number } }) => {

    return (
        <SelectDropdown
            data={fileTypes}
            defaultValue={fileTypes[0]}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setFileData({ ...fileData, type: index + 1 })
                console.log(fileData);
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={{ backgroundColor: "#8D8D8D", marginTop: 10, padding: 10, borderRadius: 5, display: "flex", justifyContent: "space-between", flexDirection: 'row', alignItems: "center" }} >
                        <Text style={{ fontFamily: "Kadwa", fontSize: 13, color: "#323232" }} >
                            {(selectedItem && selectedItem.title) || 'Select type'}
                        </Text>
                        <Image source={require("../../assets/dropdown.png")} style={{ height: 10, width: 10 }} />
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ paddingTop: 5, borderBottomWidth: 1 }}>
                        <Text style={{ fontFamily: "Kadwa", color: "#323232" }} >{item.title}</Text>
                    </View>
                );
            }}
            dropdownOverlayColor={"rgba(0,0,0,0)"}
            showsVerticalScrollIndicator={false}

            dropdownStyle={{ backgroundColor: '#8D8D8D', padding: 5, marginTop: -5, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, }}
        />

    )
}



