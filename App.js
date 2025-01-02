import React, { useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const initialState = {
  isOnboardingCompleted: false,
  showSplash: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'COMPLETE_ONBOARDING':
      return { ...state, isOnboardingCompleted: true };
    case 'HIDE_SPLASH':
      return { ...state, showSplash: false };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Simulate Splash Screen
    const timeout = setTimeout(() => {
      dispatch({ type: 'HIDE_SPLASH' });
    }, 2000); // 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.showSplash ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : !state.isOnboardingCompleted ? (
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
          >
            {(props) => <OnboardingScreen {...props} dispatch={dispatch} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: true }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
