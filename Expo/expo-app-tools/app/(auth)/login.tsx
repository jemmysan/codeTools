import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { styles } from '@/styles/button.style'

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Link href={'/(tabs)/settings/settings'} style={styles.button}>
                <Text style={styles.text}>LoginScreen</Text>
            </Link>
        </View>
    )
}

export default LoginScreen