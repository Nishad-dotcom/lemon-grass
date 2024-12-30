import React, { useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import HomeScreen from './screens/Home';

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
            {(props) => <OnboardingScreen {...props} dispatch={dispatch} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
