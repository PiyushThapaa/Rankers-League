import { View, Text, StyleSheet, Image, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import { TextInput, Button } from "react-native-paper"
import Logo from "../assets/Logo.png"
import { AuthContext, server } from '../App'

const Login = ({navigation}) => {
  
  const {setIsLoggedIn} = useContext(AuthContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [disabled,setDisabled] = useState(false)
  const [show,setShow] = useState(true)

  function loginHandler() {
    if (email==""||password=="") {
       ToastAndroid.show("Please fill all the fields",ToastAndroid.SHORT)
       return;
    }
    setDisabled(true)
    fetch(`${server}/api/v1/user/login`,
      {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
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
      <Text style={style.headerText} >Login</Text>
      </View>
      <TextInput
      label="Email"
      value={email}
      onChangeText={(text)=>{
        setEmail(text)
      }}
      style={{width:300,backgroundColor:'#ADE2F9'}}
      theme={{colors: {primary: '#3F659E'}}}
      autoCapitalize='none'
      underlineColor='none'
      selectionColor='#3F659E'
    />
      <TextInput
      label="Password"
      secureTextEntry={show}
      right={<TextInput.Icon icon='eye' onPress={()=>setShow(!show)}/>}
      value={password}
      onChangeText={(text)=>{
        setPassword(text)
      }}
      style={{width:300,backgroundColor:'#ADE2F9',marginTop:12}}
      theme={{colors: {primary: '#3F659E'}}}
      autoCapitalize='none'
      underlineColor='none'
      selectionColor='#3F659E'
    />
    <Button style={style.authButton} disabled={disabled} onPress={loginHandler}><Text style={{color:'white',fontSize:17,fontWeight:'bold'}}>Log in</Text></Button>
    <Button textColor='#3F659E' onPress={()=>navigation.navigate('Register')}>Click here to register </Button>
    </View>
  )
}

export const style = StyleSheet.create({
  body:{marginTop:150,alignSelf:'center',backgroundColor:'#F5F5F5',elevation:4,padding:17,borderRadius:10},
  header:{flexDirection:'row',justifyContent:'center',alignItems:'center'},
  headerText:{fontSize:33,alignSelf:'center',marginVertical:34,color:"#3F659E",fontWeight:'bold'},
  authButton:{
    backgroundColor:'#3F659E',
    alignSelf:'center',
    width:150,
    paddingVertical:6,
    borderRadius:50,
    marginTop:25
  }
})

export default Login