import { View, Text, Image, StyleSheet, ScrollView, ToastAndroid, Alert, ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Button, Portal, Modal, PaperProvider, ActivityIndicator, Icon } from 'react-native-paper'
import { Bar } from "react-native-progress"
import NoLeague from "../Leagues/NoLeague.jpeg"
import Bronze from "../Leagues/BronzeLeague.jpeg"
import Gold from "../Leagues/GoldLeague.jpeg"
import Crystal from "../Leagues/CrystalLeague.jpeg"
import Champion from "../Leagues/ChampionLeague.jpeg"
import { StatusBar } from "expo-status-bar"
import { AuthContext, server } from '../App'

const Profile = () => {

  const [loader, setLoader] = useState(true)
  const [name, setName] = useState("User")
  const [email, setEmail] = useState("user-email")
  const [correct, setCorrect] = useState(0)
  const [league, setLeague] = useState("no-league")
  const [progressNum, setProgressNum] = useState(0)
  const [maxProgressNum, setMaxProgressNum] = useState(5)
  const [leagueImage, setLeagueImage] = useState(NoLeague)
  const { setIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if (league == "bronze") {
      setLeagueImage(Bronze)
    } else if (league == "gold") {
      setLeagueImage(Gold)
    } else if (league == "crystal") {
      setLeagueImage(Crystal)
    } else if (league == "champion") {
      setLeagueImage(Champion)
    } else {
      setLeagueImage(NoLeague)
    }
  }, [league])

  fetch(`${server}/api/v1/user/me`)
    .then((rawData) => rawData.json())
    .then((data) => {
      setName(data.user.name)
      setEmail(data.user.email)
      setLeague(data.user.league)
      setProgressNum(data.user.progressNum)
      setMaxProgressNum(data.user.progressMaxNum)
      setCorrect(data.user.correct)
      setLoader(false)
    }).catch((e) => { console.log(e) })

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, alignItems: 'center' };


  const logoutHandler = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            fetch(`${server}/api/v1/user/logout`)
              .then((raw) => raw.json()).then((data) => {
                ToastAndroid.show(data.message, ToastAndroid.SHORT)
                setIsLoggedIn(false)
              }).catch((e) => ToastAndroid.show(e.message, ToastAndroid.SHORT))
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );

  }
  return (
    <PaperProvider>
      {
        loader == true ? <ActivityIndicator animating={true} color='#3F659E' size={'large'} style={{ flex: 1 }} />
          : <View style={style.background}>
            <StatusBar />
            <Text style={style.username}>{name}</Text>

            <Text style={style.email}>{email}</Text>
            <View style={style.leagueCard}>
              <Text style={style.leagueText}>Your Current League</Text>
              <Text style={{paddingBottom:17,fontSize:17,color:'#3F659E'}}>({correct}/75)</Text>
              <Image source={leagueImage} />
              <Text style={{ color: '#3F659E',fontWeight:'bold' }}>{league.toUpperCase()}</Text>
              <Bar progress={progressNum / maxProgressNum} width={200} color='#3F659E' style={{ marginTop: 12 }} /><Text>{progressNum}/{maxProgressNum}</Text>
              <Button style={{ marginTop: 12 }} onPress={showModal}><Text style={{ fontSize: 20, color: '#3F659E' }}>More Details...</Text></Button>
              <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 33,color:'#3F659E' }}>Leagues</Text>
                      <Image source={Bronze} />
                      <Text style={style.modelLeagueText}>BRONZE</Text>
                      <Image source={Gold} />
                      <Text style={style.modelLeagueText}>GOLD</Text>
                      <Image source={Crystal} />
                      <Text style={style.modelLeagueText}>CRYSTAL</Text>
                      <Image source={Champion} />
                      <Text style={style.modelLeagueText}>CHAMPION</Text>
                    </View>
                  </ScrollView>
                </Modal>
              </Portal>
            </View>
            <Button onPress={logoutHandler} textColor='#3F659E' style={{
              marginTop: 50
            }}><Icon source={'logout'} size={23} color='#3F659E' /><Text style={{ fontSize: 20, fontWeight: 'bold' }}>Logout</Text></Button>
          </View>
      }
    </PaperProvider>
  )
}

const style = StyleSheet.create({
  background: { backgroundColor: 'white', flex: 1, alignItems: 'center', backgroundColor: '#EEEEEE' },
  username: { fontSize: 50, fontWeight: 'bold', color: '#3F659E', marginTop: 33 },
  email: { fontSize: 11, marginBottom: 50 },
  leagueCard: { alignItems: 'center', backgroundColor: 'white', padding: 23, borderRadius: 12, elevation: 4 },
  leagueText: { fontSize: 28, fontWeight: 'bold', color: '#3F659E' },
  modelLeagueText:{ fontSize: 22, color:'#3F659E' }
})

export default Profile