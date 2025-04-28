import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
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
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Image source={require('../assets/images/pp.jpg')} style={styles.l} />
      <Text style={styles.title}>Best way</Text>
      <Text style={styles.subtitle}>xxxxxxx</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.loginButton,{backgroundColor : Colors.primary},]}
             onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton}
            onPress={handleSingup}>
                <Text style={styles.signupText}>Sign-up</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white , alignItems: 'center' },
    logo: { height:40,width:140 , marginVertical: 20},
    l: { height:250,width:250, marginVertical: 20 },
    title: { fontSize:40,fontFamily:"Bold", paddingHorizontal: 20,textAlign: "center",color: Colors.primary,marginTop: 40},
    subtitle: { fontSize:18,fontFamily:"Regular", textAlign: "center",color: Colors.secondary, marginVertical: 20},
    buttonContainer: {marginTop: 20,flexDirection: "row",borderWidth: 2,borderColor: Colors.primary,
                         width: "90%",height: 60,borderRadius: 100,},

    loginButton: { justifyContent: "center",alignItems: "center",width: "50%",borderRadius: 98,},
    loginText: { color: Colors.white,fontSize: 18,fontFamily: "SemiBold",},
    signupText: {fontSize: 18, fontFamily: "SemiBold",}
  });