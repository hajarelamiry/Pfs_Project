import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';
import { useRouter } from "expo-router";


const Home = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/Login');
  };

  const handleSingup = () => {
    router.push('/Signuproot');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Image source={require('../assets/images/pp.jpg')} style={styles.l} />
        <Text style={styles.title}>Move Better</Text>
        <Text style={styles.subtitle}>Know your bus location and plan your journey smarter</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: Colors.auth.primary }]}
            onPress={handleLogin}
          >
            <Text style={styles.loginText}>Login </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleSingup}>
            <Text style={styles.signupText}>Sign-up </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
  },
  container: {
    flex: 1,
    backgroundColor: Colors.auth.white,
    alignItems: "center",
  },
  logo: {
    height: 40,
    width: 140,
    marginVertical: 20,
  },
  l: {
    height: 250,
    width: 250,
    marginVertical: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: "Bold",
    paddingHorizontal: 20,
    textAlign: "center",
    color: Colors.auth.primary,
    marginTop: 1,
  },
  subtitle: {
    paddingHorizontal:30,
    fontSize: 15,
    fontFamily: "Regular",
    textAlign: "center",
    color: Colors.auth.secondary,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.auth.primary,
    width: "90%",
    height: 60,
    borderRadius: 100,
  },
  loginButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
  },
  loginText: {
    color: Colors.auth.white,
    fontSize: 18,
    fontFamily: "SemiBold",
  },
  signupText: {
    color: Colors.auth.primary,
    fontSize: 18,
    fontFamily: "SemiBold",
  },
});