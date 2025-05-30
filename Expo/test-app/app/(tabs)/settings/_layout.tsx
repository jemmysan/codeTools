import { View, Text } from 'react-native'
import React from 'react'
import { Stack, usePathname } from 'expo-router'

const _SettingLayout = () => {
    const pathname = usePathname();
  return (
     <Stack screenOptions={{
        animation : pathname.startsWith('settings') ? "default" :'none'
    }}>
        <Stack.Screen name='profile'/>
        <Stack.Screen name='accessibility'/>
    </Stack>
  )
}

export default _SettingLayout