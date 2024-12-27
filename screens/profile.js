import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({ firstName: "", email: "" });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);

 
  useEffect(() => {
    const loadUserData = async () => {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    };
    loadUserData();
  }, []);

 
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const handleSaveChanges = async () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert("Error", "Enter a valid 10-digit phone number.");
      return;
    }

    const updatedData = { ...userData, phoneNumber, profileImage };
    await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Onboarding");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Image
        source={
          profileImage
            ? { uri: profileImage }
            : require("../assets/placeholder.png")
        }
        style={styles.image}
      />
      <Button title="Pick an Image" onPr
