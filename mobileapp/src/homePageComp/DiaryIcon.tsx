import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const sampleText = "20.12.2024 \n it will be the last day"

const DiaryIcon = () => {
  return (
    <View style={styles.diaryConteiner}>
      <Text style={styles.diaryText}>Diary</Text>
      <View style={styles.diary}>
        <Text style={styles.innerText}>
          {sampleText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  diaryConteiner: {
    marginTop: 20,
    paddingTop: 10,
    height: 350,
    paddingLeft:5,
    width: "70%",
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#656565',
  },
  innerText:{
    color: '#D9D9D9',
    fontFamily: "Kadwa",
    padding:20,
    fontSize: 12
  },
  diary: {
    height: "80%",
    width: "90%",
    backgroundColor: '#1E1E1E',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  diaryText: {
    color: '#D9D9D9',
    fontFamily: "Kadwa",
    paddingLeft: 10, 
    paddingBottom: 5, 
    fontSize: 20,
  },
});

export default DiaryIcon;
