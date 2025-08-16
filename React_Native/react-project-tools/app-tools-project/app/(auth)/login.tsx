import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../themes/theme'; // Assure-toi que COLORS.primary et COLORS.white existent
import { useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();

  const goToTheNext = () => {
    router.push('/apple-device/home');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dashButton} onPress={goToTheNext} >
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background || '#f2f2f2',
  },
  dashButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
});
