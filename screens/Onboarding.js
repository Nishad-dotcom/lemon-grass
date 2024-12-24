import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const Onboarding = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Validate first name and email
  const validateInputs = () => {
    const nameIsValid = /^[a-zA-Z]+$/.test(firstName);
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValid(nameIsValid && emailIsValid);
  };

  return (
    <View style={styles.container}>
      b
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Little Lemon</Text>
          <Text style={styles.subtitle}>Let us get to know you</Text>
        </View>
        <Image
          style={styles.logo}
          source={require('./assets/logo.png')} 
        />
      </View>

      {/* Text Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={(text) => {
          setFirstName(text);
          validateInputs();
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateInputs();
        }}
        keyboardType="email-address"
      />

      {/* Button */}
      <Button
        title="Next"
        onPress={() => {}}
        disabled={!isValid}
        color="#4CAF50"
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  logo: {
    width: 40,
    height: 40,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
