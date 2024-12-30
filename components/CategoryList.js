import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const categories = ['Starters', 'Mains', 'Desserts', 'Drinks'];

const CategoryList = ({ onCategoryChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  useEffect(() => {
    onCategoryChange(selectedCategories);
  }, [selectedCategories, onCategoryChange]);

  return (
    <ScrollView horizontal>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => toggleCategory(category)}
          style={{
            backgroundColor: selectedCategories.includes(category) ? '#FFA500' : '#ddd',
            padding: 10,
            margin: 5,
            borderRadius: 20,
          }}>
          <Text style={{ color: selectedCategories.includes(category) ? '#fff' : '#000' }}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryList;
