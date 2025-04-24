import { View, Text} from 'react-native'
import React from 'react'
import { styles } from '@/styles/button.style'
import { Link, useRouter } from 'expo-router'


const SettingsScreen = () => {
  const router = useRouter()
  const canGoBack = router.canGoBack()
  return (
    <View style={styles.container}>
      <Link href={'/settings/boxes'} style={styles.button} push asChild>
        <Text style={styles.text}>Go to boxes</Text>
      </Link>
      
    </View>
  )
}

export default SettingsScreen