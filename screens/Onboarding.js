import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OnboardingScreen = ({ dispatch }) => {
  const handleCompleteOnboarding = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Little Lemon</Text>
      <Text style={styles.subtitle}>Discover our menu and enjoy delicious meals!</Text>
      <Button title="Get Started" onPress={handleCompleteOnboarding} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default OnboardingScreen;
