import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MenuItem = ({ item }) => {
  return (
    <View style={styles.menuItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6347',
  },
});

export default MenuItem;
