import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingScreen({ onComplete }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateFirstName = (text) => {
    setIsValidFirstName(/^[A-Za-z]+$/.test(text));
    setFirstName(text);
  };

  const validateEmail = (text) => {
    setIsValidEmail(/^\S+@\S+\.\S+$/.test(text));
    setEmail(text);
  };

  const handleNext = async () => {
    if (!isValidFirstName || !isValidEmail) {
      Alert.alert("Error", "Please enter valid information.");
      return;
    }

 
    await AsyncStorage.setItem("isOnboardingComplete", "true");
    await AsyncStorage.setItem("userData", JSON.stringify({ firstName, email }));

    onComplete(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Little Lemon</Text>
      <Text style={styles.subtitle}>Let us get to know you</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={validateFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={validateEmail}
      />
      <Button
        title="Next"
        onPress={handleNext}
        disabled={!isValidFirstName || !isValidEmail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
   
