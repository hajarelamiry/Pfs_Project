import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

const Win = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/Login'); // Navigate back to the Login page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Win Page!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: Colors.primary, padding: 10, borderRadius: 5, width: '50%', alignItems: 'center' },
  buttonText: { color: Colors.white, fontWeight: 'bold' },
});

export default Win;