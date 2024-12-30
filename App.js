import React, { useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import HomeScreen from './screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const initialState = {
  isOnboardingCompleted: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'COMPLETE_ONBOARDING':
      return { ...state, isOnboardingCompleted: true };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Check AsyncStorage to see if onboarding is completed
    const checkOnboardingStatus = async () => {
      const isCompleted = await AsyncStorage.getItem('isOnboardingCompleted');
      if (isCompleted === 'true') {
        dispatch({ type: 'COMPLETE_ONBOARDING' });
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = async () => {
    // Save onboarding completion status to AsyncStorage
    await AsyncStorage.setItem('isOnboardingCompleted', 'true');
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.isOnboardingCompleted ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <HomeScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Profile" options={{ headerShown: false }}>
              {(props) => <ProfileScreen {...props} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {(props) => (
              <OnboardingScreen {...props} handleOnboardingComplete={handleOnboardingComplete} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
