import { View, Text, Image, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput, Button } from "react-native-paper"
import {style} from './Login'
import Logo from "../assets/Logo.png"
import { AuthContext, server } from '../App'

const Register = ({navigation}) => {

  const {setIsLoggedIn} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [disabled,setDisabled] = useState(false)

  function registerHandler() {
    if (name==""||email==""||password=="") {
       ToastAndroid.show("Please fill all the fields",ToastAndroid.SHORT)
       return;
    }
    if(!email.endsWith("@gmail.com")){
      ToastAndroid.show("Enter a valid email",ToastAndroid.SHORT)
       return;
    }
    setDisabled(true)
    fetch(`${server}/api/v1/user/new`,
      {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name:name,
          email:email,
          password:password
        })
      }
    )
    .then((rawData)=>rawData.json())
    .then((data)=>{ 
      if (data["success"]===true){
      ToastAndroid.show(data.message,ToastAndroid.SHORT)
      setIsLoggedIn(true)
      } else {
        ToastAndroid.show(data.message,ToastAndroid.SHORT)
        setDisabled(false)
      }
    })
    .catch((e)=>{
      ToastAndroid.show(e,ToastAndroid.SHORT)
      setDisabled(false)
    })
  }

  return (
    <View style={style.body}>
      <View style={style.header}>
      <Image source={Logo} resizeMode="contain"
            style={{ height: 35, width: 50}}/>
      <Text style={style.headerText} >Register</Text>
      </View>
      <TextInput
      label="Name"
      value={name}
      onChangeText={(text)=>setName(text)}
      style={{width:300,backgroundColor:'#ADE2F9'}}
      theme={{colors: {primary: '#3F659E'}}}
      selectionColor='#3F659E'
    />
      <TextInput
      label="Email"
      value={email}
      onChangeText={(text)=>setEmail(text)}
      style={{width:300,backgroundColor:'#ADE2F9',marginTop:12}}
      theme={{colors: {primary: '#3F659E'}}}
      autoCapitalize='none'
      selectionColor='#3F659E'
    />
      <TextInput
      label="Password"
      secureTextEntry
      value={password}
      onChangeText={(text)=>setPassword(text)}
      style={{width:300,backgroundColor:'#ADE2F9',marginTop:12}}
      theme={{colors: {primary: '#3F659E'}}}
      autoCapitalize='none'
      underlineColor='none'
      selectionColor='#3F659E'
    />
    <Button style={style.authButton} onPress={registerHandler} disabled={disabled}><Text style={{color:'white',fontSize:17,fontWeight:'bold'}}>Sign Up</Text></Button>
    <Button textColor='#3F659E' onPress={()=>navigation.navigate('Login')}>Click here to Login </Button>
    </View>
  )
}

export default Register