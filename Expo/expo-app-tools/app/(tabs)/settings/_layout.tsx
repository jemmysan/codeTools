import React from 'react'
import { Stack, usePathname} from 'expo-router'

const SettingsLayout = () => {
    const pathname = usePathname();
  return (
    <Stack screenOptions={{
        animation : pathname.startsWith('settings') ? "default" :'none'
    }}>
        <Stack.Screen name='settings'/>
        <Stack.Screen name='boxes'/>
        <Stack.Screen name='tools'/>
    </Stack>
  )
}

export default SettingsLayout