import React from 'react'
import { Tabs } from 'expo-router'
import { COLORS } from '@/styles/themes'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const _TabLayout = () => {
  return (
        <Tabs screenOptions={ {
            tabBarActiveTintColor : `${COLORS.primary}`,
            headerShown : false}}>
            <Tabs.Screen name='home' options={{
                tabBarIcon : ({color,size}) =>(
                    <Entypo name='home' color={color} size={size}/>
                )
            }}/>
            <Tabs.Screen name='contact' options={{
                tabBarIcon : ({color, size}) => (
                    <FontAwesome name="user-circle-o" size={size} color={color} />
                )
            }}/>
                   

                 <Tabs.Screen name='settings' options={{
            tabBarIcon : ({color, size})=>(
                <Ionicons name="settings" size={size} color={color} />
            )
        }}/>

        </Tabs>
  )
}

export default _TabLayout