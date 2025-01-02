import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search for a dish..."
      value={searchQuery}
      onChangeText={(text) => setSearchQuery(text)}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 10,
  },
});

export default SearchBar;
