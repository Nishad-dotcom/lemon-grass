import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Banner = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Welcome to Little Lemon</Text>
      <Text style={styles.subtitle}>Discover our delicious menu</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a dish..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  searchBar: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default Banner;
