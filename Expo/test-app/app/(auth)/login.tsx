import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { styles } from '@/styles/button.style'

const login = () => {
  return (
    <View style={styles.container}>
        <Link href={'/(tabs)/settings/profile'} style={styles.button}>
            <Text style={styles.text}>Go to dashboard</Text>
        </Link>
    </View>
  )
}

export default login