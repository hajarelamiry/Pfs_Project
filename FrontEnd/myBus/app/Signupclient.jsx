import { StyleSheet, Text, View, TouchableOpacity, TextInput ,Alert} from 'react-native';
import React, { useState } from 'react'; // Import useState
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import axios from 'axios';

const Signupclient = () => {
  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true); // Correct useState usage

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    console.log('Sign up button clicked');
    console.log('Email:', email);
    console.log('FirstName:', firstName);
    console.log('LastName:', lastName);
    console.log('Password:', password);

    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !firstName.trim()  || !lastName.trim() || !password.trim() || !lastName.trim()) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid Email', 'Please enter a valid email address.');
      return;
    }
  

    try {
      const response = await axios.post('http://172.20.10.2:8081/api/auth/signup/client', {
        email,
        firstName,
        lastName,
        passwordHash: password,
      });
      console.log('Response:', response.data); // Debugging log
      setSuccessMessage("Signup Successful! Redirecting to login...");
      setTimeout(() => {
        console.log('Navigating to Login page'); // Debugging log
        router.push('/Login'); // Redirect to login after showing success message
      }, 2000);
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message); // Debugging log
      setErrorMessage("Signup Failed. Please try again.");
    }
  };


  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleBack}>
        <Ionicons name={"arrow-back-outline"} size={30} color={Colors.auth.primary} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get </Text>
        <Text style={styles.headingText}>started</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"person"} size={30} color={Colors.auth.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            placeholderTextColor={Colors.auth.secondary}
            value={firstName} onChangeText={setFirstName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={"person-add-outline"} size={30} color={Colors.auth.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            placeholderTextColor={Colors.auth.secondary}
            value={lastName} onChangeText={setLastName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={Colors.auth.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={Colors.auth.secondary}
            keyboardType="email-address"
            value={email} onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={Colors.auth.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={Colors.auth.secondary}
            secureTextEntry={secureEntery}
            value={password} onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntery((prev) => !prev)}>
            <SimpleLineIcons name={"eye"} size={20} color={Colors.auth.secondary} />
          </TouchableOpacity>
        </View>

        {/* Display error message */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Display success message */}
        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignup}>
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signupclient;

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
    fontFamily: "Bold",
  },
  errorText: {
    color: Colors.error || "red", // Use a red color for error messages
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  successText: {
    color: "green", // Use a green color for success messages
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});