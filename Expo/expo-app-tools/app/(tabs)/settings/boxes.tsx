import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/button.style'
import { Link, useRouter } from 'expo-router'

const BoxesScreen = () => {

    const router = useRouter();
    const canGoBack = router.canGoBack();
    return (
        <View style={styles.container}>
            <Link href={'/settings/tools'} style={styles.button} push asChild>
                <Text style={styles.text}>Go to tools</Text>
            </Link>
            { canGoBack ? 
            <TouchableOpacity style={styles.button} onPress={()=>{
                    router.back()
                  }}>
                      <Text style={styles.text}>Go back</Text>
                  </TouchableOpacity>: null
            }
        </View>
    )
}

export default BoxesScreen