import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../constants/fonts';


const Signuproot = () => {
  const navigation = useNavigation();
  
  const handleSignupdriver = () => {
    navigation.navigate("Signupdriver")
  };
  const handleSignupclient = () => {
    navigation.navigate("Signupclient");
  };
  const handleBack = () => {
    navigation.goBack();
};


  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={handleBack}>
        <Ionicons name={"arrow-back-outline"} size={30} color={Colors.primary }/>
        </TouchableOpacity>

      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Image source={require('../assets/images/route.jpg')} style={styles.l} />
      <Text style={styles.title}>Best Job or Best Path ?</Text>
      <Text style={styles.subtitle}>xxxxxxx</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.loginButton,{backgroundColor : Colors.primary},]}
             onPress={handleSignupdriver}>
                <Text style={styles.loginText}>Driver</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton}
            onPress={handleSignupclient}>
                <Text style={styles.signupText}>Client</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Signuproot;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white , alignItems: 'center' },
    backButtonWrapper: {
        height: 40,
        width: 40,
        backgroundColor: Colors.gray,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      },
    logo: { height:40,width:140 , marginVertical: 20},
    l: { height:250,width:231 , marginVertical: 10},
    title: { fontSize:40,fontFamily:"Bold", paddingHorizontal: 20,textAlign: "center",color: Colors.primary,marginTop: 40},
    subtitle: { fontSize:18,fontFamily:"Regular", textAlign: "center",color: Colors.secondary, marginVertical: 5},
    buttonContainer: {marginTop: 20,flexDirection: "row",borderWidth: 2,borderColor: Colors.primary,
                         width: "90%",height: 60,borderRadius: 100,},

    loginButton: { justifyContent: "center",alignItems: "center",width: "50%",borderRadius: 98,},
    loginText: { color: Colors.white,fontSize: 18,fontFamily: fonts.SemiBold,},
    signupText: {fontSize: 18, fontFamily: fonts.SemiBold,}
    //input: { borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 12 },
  });