import React from 'react';
import { Button, Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

interface FileHeaderProps {
    navigation: StackNavigationProp<any, any>;
}

const FileHeader = ({ navigation }: FileHeaderProps) => {
    const route: any = useRoute();
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.cont} onPress={() => navigation.goBack()}>
                <Image
                    source={require("../../assets/backleaf.png")}
                    style={styles.backleaf}
                />
            </TouchableOpacity>
         <AutoSizeText
      style={styles.itemName}
      fontSizePresets={[22, 18, 16, 12, 11, 10, 8]} 
      numberOfLines={1}
      mode={ResizeTextMode.preset_font_sizes} 
    >
      {route.params.name}
    </AutoSizeText>
            <View style={styles.cont}>
                <TouchableOpacity onPress={() => console.log("edit")}>
                    <Image
                        source={require("../../assets/pen.png")}
                        style={styles.pen}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("export")}>
                    <Image
                        source={require("../../assets/export.png")}
                        style={styles.pen}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#313131",
        flexDirection: "row",
        alignItems: "flex-end",
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        justifyContent: "space-between",
    },
    itemName: {
        color: "#A6A6A6",
        fontSize: 20,
        lineHeight: 30,
        width: "50%",
        textAlign: "center",
        height: 20,
        fontFamily: "Kadwa"
    },
    pen: {
        width: 40,
        height: 40,
    },
    backleaf: {
        width: 77,
        height: 40,
    },
    cont: {
        flexDirection: 'row', 
        gap:10,
        justifyContent: 'space-between',
        alignItems: 'center', 
    },

});

export default FileHeader;
