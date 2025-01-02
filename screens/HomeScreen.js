import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Banner from '../components/Banner';
import Category from '../components/Category';
import MenuItem from '../components/MenuItem';

const menuItems = [
  { id: 1, name: 'Greek Salad', description: 'Fresh vegetables with feta cheese.', price: 12.99, image: require('../assets/greekSalad.png'), category: 'Salads' },
  { id: 2, name: 'Bruschetta', description: 'Grilled bread with garlic and tomatoes.', price: 8.99, image: require('../assets/bruschetta.png'), category: 'Appetizers' },
  { id: 3, name: 'Grilled Fish', description: 'Fish fillet grilled to perfection.', price: 15.99, image: require('../assets/grilledFish.png'), category: 'Main Course' },
  { id: 4, name: 'Pasta', description: 'Pasta with homemade marinara sauce.', price: 10.99, image: require('../assets/pasta.png'), category: 'Main Course' },
  { id: 5, name: 'Lemon Dessert', description: 'Citrus flavored dessert.', price: 6.99, image: require('../assets/lemonDessert.png'), category: 'Desserts' },
];

const categories = ['All', 'Salads', 'Appetizers', 'Main Course', 'Desserts'];

const HomeScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);

  useEffect(() => {
    filterMenuItems();
  }, [selectedCategories, searchQuery]);

  const filterMenuItems = () => {
    let filteredItems = menuItems;

    if (!selectedCategories.includes('All')) {
      filteredItems = filteredItems.filter(item => selectedCategories.includes(item.category));
    }

    if (searchQuery) {
      filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredMenuItems(filteredItems);
  };

  return (
    <View style={styles.container}>
      <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Category
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <FlatList
        data={filteredMenuItems}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
