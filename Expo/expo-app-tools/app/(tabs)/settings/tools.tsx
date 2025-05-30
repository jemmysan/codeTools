import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { styles } from '@/styles/button.style';

const ToolsScreen = () => {
  const router = useRouter();
  const canGoBack = router.canGoBack();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ToolsScreen</Text>

      {canGoBack ?
        <TouchableOpacity style={styles.button} onPress={() => {
          router.back()
        }}>
          <Text style={styles.text}>Go back</Text>
        </TouchableOpacity> : null
      }
    </View>
  )
}

export default ToolsScreen