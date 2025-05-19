import { StyleSheet, Text, View, TouchableOpacity, TextInput ,Alert} from 'react-native';
import React, { useState } from 'react'; // Import useState
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
// import { fonts } from '../constants/fonts';
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import axios from 'axios';

const Login = () => {
  const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Light: require('../assets/fonts/Poppins-Light.ttf'),
    Medium: require('../assets/fonts/Poppins-Medium.ttf'),
  });
  
  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true); 
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  const handleLogin = async () => {
    console.log('login button clicked');
    
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid Email. Please enter a valid email address.");
      return;
    }


    try {
      const response = await axios.post('http://172.20.10.2:8081/api/auth/login', {
        email,
        passwordHash: password,
      });

  const { token, role } = response.data;

    if (role === "CLIENT") {
      router.push('/client/client');
    } else if (role === "DRIVER") {
      router.push('/driver/DriverDashboard');
    } else if (
      role === "ADMIN" 
    ) {
      router.push('/admin/admin');
    } else {
      setErrorMessage("Unauthorized role or credentials.");
    }
    } catch (error) {
      console.error(error);
      setErrorMessage("Login Failed. Please check your credentials.");
    }
  };
  const handleBack = () => {
    navigation.goBack();
  };

  const handleSingup = () => {
    router.push('Signuproot');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleBack}>
        <Ionicons name={"arrow-back-outline"} size={30} color={Colors.auth.primary} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey, </Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={Colors.auth.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={Colors.auth.secondary}
            keyboardType="email-address"
            value={email} 
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={Colors.auth.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={Colors.auth.secondary}
            secureTextEntry={secureEntery}
            value={password} 
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntery((prev) => !prev)}>
            <SimpleLineIcons name={"eye"} size={20} color={Colors.auth.secondary} />
          </TouchableOpacity>
        </View>

          {/* Display error message */}
          {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSingup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.auth.white, padding: 20 },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: Colors.auth.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { marginVertical: 20 },
  headingText: { fontSize: 32, color: Colors.auth.primary, fontFamily: "Bold" },
  formContainer: { marginTop: 20 },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.auth.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: "Light",
  },
  loginButtonWrapper: {
    backgroundColor: Colors.auth.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: Colors.auth.white,
    fontSize: 20,
    fontFamily: "Bold",
    textAlign: "center",
    padding: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: Colors.auth.primary,
    fontFamily: "Regular",
  },
  signupText: {
    color: Colors.auth.secondary,
    fontFamily: "Bold", // Fixed here
  },
  errorText: {
    color: Colors.error || "red", // Use a red color for error messages
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});