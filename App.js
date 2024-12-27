import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const status = await AsyncStorage.getItem("isOnboardingComplete");
      setIsOnboardingComplete(status === "true"); // Convert string to boolean
      setIsLoading(false);
    };
    checkOnboardingStatus();
  }, []);

  
  if (isLoading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingComplete ? (
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
          >
            {(props) => (
              <OnboardingScreen
                {...props}
                onComplete={() => setIsOnboardingComplete(true)}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
