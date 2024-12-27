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

    // Save to AsyncStorage
    await AsyncStorage.setItem("isOnboardingComplete", "true");
    await AsyncStorage.setItem("userData", JSON.stringify({ firstName, email }));

    onComplete(); // Notify App.js to switch to the Profile screen
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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
