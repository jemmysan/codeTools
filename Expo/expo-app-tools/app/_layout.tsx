
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

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