import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon.db");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [menuItems, setMenuItems] = useState([]);

  // Image Map: Corrected to refer to .png files
  const imageMap = {
    "greekSalad.png": require("../assets/greekSalad.png"),
    "bruschetta.png": require("../assets/bruschetta.png"),
    "grilledFish.png": require("../assets/grilledFish.png"),
    "pasta.png": require("../assets/pasta.png"),
    "lemonDessert.png": require("../assets/lemonDessert.png"),
  };

  // Fetch menu data or load from SQLite
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, image TEXT);"
      );

      tx.executeSql("SELECT * FROM menu", [], (_, { rows }) => {
        if (rows.length > 0) {
          // Load data from SQLite if already stored
          const data = rows._array.map((item) => ({
            name: item.name,
            price: item.price,
            description: item.description,
            image: imageMap[item.image], // Reference the imageMap for the correct image
          }));
          setMenuItems(data);
        } else {
          // Fetch menu data from remote server if no data is stored in SQLite
          fetchMenuData();
        }
      });
    });
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json"
      );
      const data = await response.json();

      // Store the fetched data in SQLite
      db.transaction((tx) => {
        data.menu.forEach((item) => {
          tx.executeSql(
            "INSERT INTO menu (name, price, description, image) VALUES (?, ?, ?, ?)",
            [item.name, item.price, item.description, item.image]
          );
        });
      });

      // Update the state with the fetched data
      const transformedData = data.menu.map((item) => ({
        name: item.name,
        price: item.price,
        description: item.description,
        image: imageMap[item.image], // Map the image filename correctly
      }));

      setMenuItems(transformedData);
    } catch (error) {
      console.error("Error fetching menu data: ", error);
    }
  };

  // Render each menu item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={item.image} style={styles.menuItemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default HomeScreen;
