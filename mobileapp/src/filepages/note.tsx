import React, { useState, useRef } from 'react';
import { TextInput, Pressable, View, StyleSheet, Text } from 'react-native';

const DOUBLE_PRESS_DELAY = 300; // Максимальний інтервал між натисканнями для подвійного кліку (в мс)

const Note = () => {
    const [text, setText] = useState<string>('');
    const [isEditable, setIsEditable] = useState<boolean>(true);
    const [dblpress, setDblpress] = useState<NodeJS.Timeout | null>(null);
    const textareaRef = useRef<TextInput | null>(null);
    const handleTextChange = (newText: string) => {
        setText(newText);
    };

  

    return (
        <Pressable  style={styles.container}>
            <TextInput
                ref={textareaRef}
                editable={isEditable}
                style={[styles.textarea, !isEditable && styles.textareaDisabled]}
                value={text}
                onChangeText={handleTextChange}
                placeholder="Type here..."
                multiline
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
        backgroundColor: '#1e1e1e',
    },
    textarea: {
        color: '#bfbfbf',
        width: '100%',
        minHeight: '90%',
        height: 200,
        padding: 20,
        fontSize: 25,
        fontFamily: 'Kadwa',
        fontWeight: '700',
        lineHeight: 30,
        textAlignVertical: 'top',
    },
    textareaDisabled: {
        color: '#bfbfbf',
        borderWidth: 0,
    },
});

export default Note;
