import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Category = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(category)}
      style={[
        styles.category,
        isSelected && styles.selectedCategory,
      ]}
    >
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  selectedCategory: {
    backgroundColor: '#ff6347',
    borderColor: '#ff6347',
  },
  categoryText: {
    fontSize: 16,
  },
});

export default Category;
