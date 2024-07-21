import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from "expo-status-bar"
import { Checkbox } from 'react-native-paper'
import { server } from '../App'

const Home = ({ navigation }) => {

  const [status, setStatus] = useState([false, false, false])

  fetch(`${server}/api/v1/user/me`)
    .then((rawData) => rawData.json())
    .then((data)=>{
      setStatus((prevStatus)=>{
        const newStatus = [...prevStatus]
        newStatus[0] = data.user.PhysicsBunch
        newStatus[1] = data.user.ChemistryBunch
        newStatus[2] = data.user.MathsBunch
        return newStatus
      })
    })

  return (
    <View style={{ paddingTop: 30, flex: 1 }}>
      <StatusBar />
      <ScrollView>

        <View style={style.listItem} onTouchEnd={() => navigation.navigate('Quizzes', {
          QuizName1: "Physics Quiz 1",
          QuizName2: "Physics Quiz 2",
          QuizName3: "Physics Quiz 3",
          QuizName4: "Physics Quiz 4",
          QuizName5: "Physics Quiz 5",
          subject: "physics"
        })}>
          <Text style={style.textStyle}>Physics</Text>
          <Checkbox status={status[0] ? 'checked' : 'unchecked'} color='#3F659E' />
        </View>
        <View style={style.listItem} onTouchEnd={() => navigation.navigate('Quizzes', {
          QuizName1: "Chemistry Quiz 1",
          QuizName2: "Chemistry Quiz 2",
          QuizName3: "Chemistry Quiz 3",
          QuizName4: "Chemistry Quiz 4",
          QuizName5: "Chemistry Quiz 5",
          subject: "chemistry"
        })}>
          <Text style={style.textStyle}>Chemistry</Text>
          <Checkbox status={status[1] ? 'checked' : 'unchecked'} color='#3F659E' />
        </View>
        <View style={style.listItem} onTouchEnd={() => navigation.navigate('Quizzes', {
          QuizName1: "Maths Quiz 1",
          QuizName2: "Maths Quiz 2",
          QuizName3: "Maths Quiz 3",
          QuizName4: "Maths Quiz 4",
          QuizName5: "Maths Quiz 5",
          subject: "maths"
        })}>
          <Text style={style.textStyle}>Mathematics</Text>
          <Checkbox status={status[2] ? 'checked' : 'unchecked'} color='#3F659E' />
        </View>
      </ScrollView>
    </View>
  )
}

export const style = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 26,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    paddingVertical: 27,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: "space-between",
    fontSize: 23,
    fontWeight: 'bold'
  },
  textStyle: {
    fontSize: 23,
    fontWeight: 'bold'
  }

})

export default Home