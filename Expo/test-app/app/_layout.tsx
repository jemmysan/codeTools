import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex:1}} >
            <React.Fragment>
                <StatusBar />
                    <Stack screenOptions={{
                        headerShown : false
                    }}/>
            </React.Fragment>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default _layout