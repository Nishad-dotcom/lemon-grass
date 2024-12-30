import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

const Banner = ({ onSearchChange }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/restaurant_banner.png')} style={styles.image} />
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Chicago</Text>
      <Text style={styles.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a dish"
        onChangeText={onSearchChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#777',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  searchBar: {
    width: '80%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 15,
  },
});

export default Banner;
