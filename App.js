import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { ThemeProvider } from './src/theme/ThemeContext';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeHomeScreen from './src/screens/WelcomeHomeScreen';
import HummelInstructionsScreen from './src/screens/HummelInstructionsScreen';
import HummelChatScreen from './src/screens/HummelChatScreen';
import HummelChatEditScreen from './src/screens/HummelChatEditScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import HistoryDeletedScreen from './src/screens/HistoryDeletedScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="WelcomeHome" component={WelcomeHomeScreen} />
            <Stack.Screen name="HummelInstructions" component={HummelInstructionsScreen} />
            <Stack.Screen name="HummelChat" component={HummelChatScreen} />
            <Stack.Screen name="HummelChatEdit" component={HummelChatEditScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="HistoryDeleted" component={HistoryDeletedScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}