import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from "react";
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import Footer from './Screens/Footer';
import QuizList from './Screens/QuizList';
import QuizTemplate from './Screens/QuizTemplate';
import Login from './Screens/Login';
import {StatusBar} from "expo-status-bar"
import Register from "./Screens/Register";
import Top from "./Screens/Top";
import { ActivityIndicator } from "react-native-paper";

export const server = "http://192.168.1.37:3000"


const Stack = createNativeStackNavigator();
export const AuthContext = createContext(undefined);


export default function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(undefined)
  const [loader,setLoader] = useState(true)
 
    fetch(`${server}/api/v1/user/me`)
    .then((e)=>e.ok?setIsLoggedIn(true):setIsLoggedIn(false))
    .then(()=>setLoader(false))
  
  return(
    <AuthContext.Provider value={{setIsLoggedIn}}>
      {loader? <ActivityIndicator animating={true} color='#3F659E' size={'large'} style={{ flex: 1 }} />  : 
      (isLoggedIn==true? <Main/>:<AuthComponent/>)
       }
    </AuthContext.Provider>
  )
}

 function Main() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Subjects'>
          <Stack.Screen name='Subjects' component={Home} options={{headerTintColor:"white",headerStyle:{backgroundColor:'#3F659E'}}} />
          <Stack.Screen name='Profile' component={Profile} options={{headerTintColor:"white",headerStyle:{backgroundColor:'#3F659E'}}} />
          <Stack.Screen name='Quizzes' component={QuizList} options={{headerTintColor:"white",headerStyle:{backgroundColor:'#3F659E'}}} />
          <Stack.Screen name='Quiz' component={QuizTemplate} options={{headerTintColor:"white",headerStyle:{backgroundColor:'#3F659E'}}} />
          <Stack.Screen name='Top Rankers' component={Top} options={{headerTintColor:"white",headerStyle:{backgroundColor:'#3F659E'}}} />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
  );
}

function AuthComponent(){
  return(
    <>
    <StatusBar backgroundColor="#3F659E"/>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
    <Stack.Screen name='Register' component={Register} options={{headerShown:false}} />
    </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}