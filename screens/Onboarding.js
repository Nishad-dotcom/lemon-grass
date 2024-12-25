import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OnboardingScreen = ({ onComplete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Onboarding</Text>
      <Button
        title="Complete Onboarding"
        onPress={onComplete}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
