import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, Button } from 'react-native';
import useUserFile from '../mobX/useUserFile';
import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite'; ''
import editable from '../mobX/Editable';

const Note = observer(() => {
    const route:any = useRoute();
    const { name, id } = route.params;
    const inputRef = useRef<TextInput>(null);
    const [text, setText] = useState('');
    const [debounce, setDebounce] = useState<NodeJS.Timeout | null>(null)


    useEffect(() => {
        useUserFile.GetFile(name, 1, id);
        setText(useUserFile.fileData?.text || '');
    }, [name, id]);

    useEffect(() => {
        if (text !== useUserFile.fileData?.text && text !== "") {
            if (debounce !== null)
                clearTimeout(debounce)
            console.log("deb")
            let d = setTimeout(() => {
                useUserFile.EditFile(name, 1, id, text);
            }, 1000);
            setDebounce(d)
        }

    }, [text, name, id]);


    useEffect(() => {

        if (inputRef.current && editable.value) {
            inputRef.current.focus();
        }
        else {
            Keyboard.dismiss()
        }
    }, [editable.value]);


    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <TextInput
                    ref={inputRef}
                    onChange={(e) => setText(e.nativeEvent.text)}
                    placeholder='Click on pen above to start editing'
                    placeholderTextColor="#a9a9a9"
                    style={styles.textarea}
                    value={text}
                    editable={editable.value}
                    multiline
                />
            </View>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#1e1e1e',
    },
    textarea: {
        color: '#bfbfbf',
        width: '100%',
        padding: 10,
        flex:1,
        paddingTop: 30,
        fontSize: 15,
        fontFamily: 'Kadwa',
        fontWeight: '700',
        lineHeight: 22,
        textAlignVertical: 'top',
    },
    textareaDisabled: {
        color: '#bfbfbf',
        borderWidth: 0,
    },
});

export default Note;
