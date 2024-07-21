import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { style } from './Home'
import { StatusBar } from 'expo-status-bar'
import { Icon } from 'react-native-paper'
import NoLeague from "../Leagues/NoLeague.jpeg"
import Bronze from "../Leagues/BronzeLeague.jpeg"
import Gold from "../Leagues/GoldLeague.jpeg"
import Crystal from "../Leagues/CrystalLeague.jpeg"
import Champion from "../Leagues/ChampionLeague.jpeg"
import { server } from '../App'

const Top = () => {

    const [top,setTop] = useState([])
    
    fetch(`${server}/api/v1/league/top`)
    .then((raw)=>raw.json())
    .then((data)=>{
        setTop(data.topPlayers)
    }).catch((e)=>console.log(e))

    return (
        <View style={{ marginTop: 12 }}>
            <StatusBar />
            {top.map((data)=>{
                let username = ''
                const splitted = (data.email).split('@')
                username = splitted[0]
                let league = data.league
                let League = ''
                if (league == "bronze") {
                    League = Bronze
                  } else if (league == "gold") {
                    League = Gold
                  } else if (league == "crystal") {
                    League = Crystal
                  } else if (league == "champion") {
                    League = Champion
                  } else {
                    League = NoLeague
                  }
                return(
                    <View style={style.listItem} key={top.indexOf(data)} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon source={"account"} size={44} color='#3F659E' />
                    <View>
                        <Text style={{
                            fontSize: 23,
                            fontWeight: 'bold',
                            color:'#3F659E'
                        }}>{data.name}</Text>
                        <Text style={{color:'#3F659E'}}>({username}) - {data.correct}/75</Text>
                    </View>
                </View>
                    <Image source={League} resizeMode='contain' style={{ height: 50, width: 50 }} />
            </View>
                )
            })}
        </View>
    )
}

export default Top