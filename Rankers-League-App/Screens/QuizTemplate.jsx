import { View, Text, ScrollView, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Button, Checkbox } from 'react-native-paper'
import { quizData } from "../data.js"
import { server } from '../App.js'


const QuizTemplate = ({ route }) => {
  const { subject, quizNum } = route.params
  const [options, setOptions] = useState([[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]])
  const [answer, setAnswer] = useState([undefined, undefined, undefined, undefined, undefined])
  const [visible, setVisible] = useState(false)
  const [disabled, setDisabled] = useState(false)
  fetch(`${server}/api/v1/user/me`)
    .then((rawData) => rawData.json())
    .then((data) => {
      if (subject == "chemistry") {
        if (quizNum == 1) {
          setDisabled(data.user.chemQuiz1)
        }
        else if (quizNum == 2) {
          setDisabled(data.user.chemQuiz2)
        }
        else if (quizNum == 3) {
          setDisabled(data.user.chemQuiz3)
        }
        else if (quizNum == 4) {
          setDisabled(data.user.chemQuiz4)
        }
        else if (quizNum == 5) {
          setDisabled(data.user.chemQuiz5)
        }
      } else if (subject == "maths") {
        if (quizNum == 1) {
          setDisabled(data.user.mathQuiz1)
        }
        else if (quizNum == 2) {
          setDisabled(data.user.mathQuiz2)
        }
        else if (quizNum == 3) {
          setDisabled(data.user.mathQuiz3)
        }
        else if (quizNum == 4) {
          setDisabled(data.user.mathQuiz4)
        }
        else if (quizNum == 5) {
          setDisabled(data.user.mathQuiz5)
        }
      } else if (subject == "physics") {
        if (quizNum == 1) {
          setDisabled(data.user.phyQuiz1)
        }
        else if (quizNum == 2) {
          setDisabled(data.user.phyQuiz2)
        }
        else if (quizNum == 3) {
          setDisabled(data.user.phyQuiz3)
        }
        else if (quizNum == 4) {
          setDisabled(data.user.phyQuiz4)
        }
        else if (quizNum == 5) {
          setDisabled(data.user.phyQuiz5)
        }
      }
    }).catch((e) => { console.log(e) })

  const submitHandler = async () => {
    let correct = 0
    let currentLeague = ''
    let leagueAfterSubmission = ''

    await fetch(`${server}/api/v1/user/me`)
      .then((rawData) => rawData.json())
      .then((data) => {
        currentLeague = data.user.league
      }).catch((e) => { console.log(e) })

    for (const e of answer) {
      if (e == true) {
        correct += 1
      }
    }
    await fetch(`${server}/api/v1/league/correctAns`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correct, subject, quizNum
      })
    }).then((raw) => raw.json())
      .then(() => {
        setDisabled(true)
        setVisible(true)
      }).catch((e) => console.log(e))

    await fetch(`${server}/api/v1/user/me`)
      .then((rawData) => rawData.json())
      .then((data) => {
        leagueAfterSubmission = data.user.league
        if (currentLeague !== leagueAfterSubmission) {
          ToastAndroid.show(`You are promoted to ${leagueAfterSubmission.toUpperCase()} League`, ToastAndroid.SHORT)
        }
      }).catch((e) => { console.log(e) })
  }

  const checkboxHandler = (num, obj, option) => {
    setOptions(prevOptions => {
      const newOptions = prevOptions.map(row => [...row]);
      for (let i = 0; i < 4; i++) {
        if (num == i) {
          newOptions[quizData[subject][quizNum].indexOf(obj)][num] = true
          if (option == obj.answer) {
            setAnswer(prevAnswers => {
              const newAnswers = [...prevAnswers]
              newAnswers[quizData[subject][quizNum].indexOf(obj)] = true
              return newAnswers
            })
          } else {
            setAnswer(prevAnswers => {
              const newAnswers = [...prevAnswers]
              newAnswers[quizData[subject][quizNum].indexOf(obj)] = false
              return newAnswers
            })
          }
        } else {
          newOptions[quizData[subject][quizNum].indexOf(obj)][i] = false
        }
      }

      return newOptions;
    });
  }

  return (
    <>
      <ScrollView>
        <View style={{ padding: 25 }}>
          {quizData[subject][quizNum].map((obj) => {
            return (
              <View style={{ marginBottom: 22 }} key={quizData[subject][quizNum].indexOf(obj)}>
                <Text style={{ fontSize: 18 }}>{obj.question}</Text>
                <View style={style.optionStyle}>
                  <Checkbox color='#3F659E' status={options[quizData[subject][quizNum].indexOf(obj)][0] ? 'checked' : 'unchecked'} onPress={() => checkboxHandler(0, obj, obj.option1)} />
                  <Text>{obj.option1}</Text>
                </View>
                <View style={style.optionStyle}>
                  <Checkbox color='#3F659E' status={options[quizData[subject][quizNum].indexOf(obj)][1] ? 'checked' : 'unchecked'} onPress={() => checkboxHandler(1, obj, obj.option2)} />
                  <Text>{obj.option2}</Text>
                </View>
                <View style={style.optionStyle}>
                  <Checkbox color='#3F659E' status={options[quizData[subject][quizNum].indexOf(obj)][2] ? 'checked' : 'unchecked'} onPress={() => checkboxHandler(2, obj, obj.option3)} />
                  <Text>{obj.option3}</Text>
                </View>
                <View style={style.optionStyle}>
                  <Checkbox color='#3F659E' status={options[quizData[subject][quizNum].indexOf(obj)][3] ? 'checked' : 'unchecked'} onPress={() => checkboxHandler(3, obj, obj.option4)} />
                  <Text>{obj.option4}</Text>
                </View>
                <Text style={{ display: visible ? 'flex' : 'none', color: answer[quizData[subject][quizNum].indexOf(obj)] ? 'green' : 'red' }}>
                  {answer[quizData[subject][quizNum].indexOf(obj)] ? 'Correct' : 'Incorrect'}
                </Text>
              </View>
            )
          })}
        </View>
        <Button style={style.buttonStyle} disabled={disabled} onPress={submitHandler} buttonColor='#3F659E' textColor='white'><Text style={{ fontSize: 17 }}>Submit</Text></Button>
      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  optionStyle: { flexDirection: 'row', alignItems: 'center' },
  buttonStyle: { alignSelf: 'center', marginBottom: 12, paddingHorizontal: 22, paddingVertical: 4 }
})

export default QuizTemplate