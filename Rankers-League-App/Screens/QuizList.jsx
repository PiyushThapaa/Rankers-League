import { View, Text, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import React, { useState } from 'react';
import { style } from './Home';
import { StatusBar } from "expo-status-bar"
import { server } from '../App';

const QuizList = ({ route, navigation }) => {
  // Provide default values in case parameters are not passed
  const { QuizName1 = "Quiz 1", QuizName2 = "Quiz 2", QuizName3 = "Quiz 3", QuizName4 = "Quiz 4", QuizName5 = "Quiz 5", subject } = route.params || {};
  const [status, setStatus] = useState([false, false, false, false, false])

  fetch(`${server}/api/v1/user/me`)
    .then((rawData) => rawData.json())
    .then((data) => {
      if (subject == "chemistry") {
        setStatus((prevStatus) => {
          const newStatus = [...prevStatus]
          newStatus[0] = data.user.chemQuiz1
          newStatus[1] = data.user.chemQuiz2
          newStatus[2] = data.user.chemQuiz3
          newStatus[3] = data.user.chemQuiz4
          newStatus[4] = data.user.chemQuiz5
          return newStatus
        })
      } else if (subject == "physics"){
        setStatus((prevStatus) => {
          const newStatus = [...prevStatus]
          newStatus[0] = data.user.phyQuiz1
          newStatus[1] = data.user.phyQuiz2
          newStatus[2] = data.user.phyQuiz3
          newStatus[3] = data.user.phyQuiz4
          newStatus[4] = data.user.phyQuiz5
          return newStatus
        })
      } else if (subject == "maths"){
        setStatus((prevStatus) => {
          const newStatus = [...prevStatus]
          newStatus[0] = data.user.mathQuiz1
          newStatus[1] = data.user.mathQuiz2
          newStatus[2] = data.user.mathQuiz3
          newStatus[3] = data.user.mathQuiz4
          newStatus[4] = data.user.mathQuiz5
          return newStatus
        })
      } 
    })
  return (
    <View style={{ marginTop: 30 }}>
      <StatusBar />
      <ScrollView>
        <View style={style.listItem} onTouchEnd={() => navigation.navigate('Quiz', {
          subject: subject,
          quizNum: 1
        })}>
          <Text style={style.textStyle}>{QuizName1}</Text>
          <Checkbox status={status[0] ? 'checked' : 'unchecked'} color='#3F659E' />
        </View>
        <View style={style.listItem} onTouchEnd={() => navigation.navigate('Quiz', {
          subject: subject,
          quizNum: 2
        })}>
          <Text style={style.textStyle}>{QuizName2}</Text>
          <Checkbox status={status[1] ? 'checked' : 'unchecked'} color='#3F659E' />
        </View>
        <View style={style.listItem} onTouchEnd={() => navigation.navigate('Quiz', {
          subject: subject,
          quizNum: 3
        })}>
          <Text style={style.textStyle}>{QuizName3}</Text>
          <Checkbox status={status[2] ? 'checked' : 'unchecked'} color='#3F659E' />
        </View>
        <View style={style.listItem} onTouchEnd={() => navigation.navigate('Quiz', {
          subject: subject,
          quizNum: 4
        })}>
          <Text style={style.textStyle}>{QuizName4}</Text>
          <Checkbox status={status[3] ? 'checked' : 'unchecked'} color='#3F659E' />
        </View>
        <View style={style.listItem} onTouchEnd={() => navigation.navigate('Quiz', {
          subject: subject,
          quizNum: 5
        })}>
          <Text style={style.textStyle}>{QuizName5}</Text>
          <Checkbox status={status[4] ? 'checked' : 'unchecked'} color='#3F659E' />
        </View>
      </ScrollView>
    </View>
  )
}

export default QuizList;
