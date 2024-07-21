import { View, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { IconButton } from 'react-native-paper'
import { useNavigation } from "@react-navigation/native"

const Footer = () => {
  const navigation = useNavigation()
  return (
    <View style={style.footer}>
      <StatusBar/>
        <IconButton icon={"home"} size={35} iconColor='white' onPress={()=>navigation.navigate('Subjects')} />
        <IconButton icon={"trophy"} size={35} iconColor='white' onPress={()=>navigation.navigate('Top Rankers')} />
        <IconButton icon={"account"} size={35} iconColor='white' onPress={()=>navigation.navigate('Profile')} />
      </View>
  )
}

const style = StyleSheet.create({
    footer: {
      backgroundColor: "#3F659E",
      flexDirection: "row",
      justifyContent: "space-around"
    }
  })

export default Footer