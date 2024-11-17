import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const Diary = () => {
  const [pages, setPages] = useState([""])
  const [page, setPage] = useState(pages.length)

  return (
    <View style={{ backgroundColor: '#1e1e1e', }}>
      <View style={styles.nav}> <MaterialCommunityIcons
        name="forward"
        size={24}
        color="black"
        // style={{ transform: [{ rotateY: '180deg' }] }}
      />
        <Text>page {page} </Text>
        {!(page === pages.length) ?
          <MaterialCommunityIcons name="forward" size={24} color="black" /> : <FontAwesome name="plus" size={24} color="black" />}
      </View>
      <TextInput/>
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
    backgroundColor: "#2A2A2A",

  }
})

export default Diary
