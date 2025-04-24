import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS } from '@/styles/themes';


const TabsLayout = () => {
  return (
    
    <Tabs screenOptions={{
        tabBarActiveTintColor :`${COLORS.primary}`,
        headerShown : false}} backBehavior='order'>
        <Tabs.Screen name='home' options={{
            tabBarIcon : ({color, size})=>(
                <Entypo name="home" size={size} color={color} />
            )
        }}/>

       <Tabs.Screen name='profile' options={{
            tabBarIcon : ({color, size})=>(
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

export default TabsLayout