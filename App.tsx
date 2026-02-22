/**
 * Smart Eye - Main Application Entry Point
 * Implements navigation structure and accessibility configuration
 * P1 Final: Complete navigation with Live Detection module
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AccessibilityInfo } from 'react-native';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
if (Platform.OS !== 'web') {
  require("@tensorflow/tfjs-react-native");
}


// Import screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import LiveDetectionScreen from './src/screens/LiveDetectionScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DetectionHistoryScreen from './src/screens/DetectionHistoryScreen';
import TutorialScreen from './src/screens/TutorialScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

// Type definitions
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Home: { user?: any };
  LiveDetection: { mode?: string };
  Settings: undefined;
  History: undefined;
  Tutorial: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    // Initialize accessibility features on app start
    initializeAccessibility();

    return () => {
      // Cleanup on app unmount
      Speech.stop();
    };
  }, []);

  const initializeAccessibility = async () => {
    try {
      // Check if screen reader is enabled
      const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();

      if (screenReaderEnabled) {
        console.log('Screen reader detected - Enhanced accessibility mode enabled');
        // Announce app launch
        Speech.speak('Smart Eye application started. Visual assistance ready.', {
          language: 'en-US',
          pitch: 1.0,
          rate: 0.9,
        });
      }
    } catch (error) {
      console.error('Error initializing accessibility:', error);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login',
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              title: 'Sign Up',
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              title: 'Reset Password',
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              gestureEnabled: false, // Prevent accidental back navigation
            }}
          />
          <Stack.Screen
            name="LiveDetection"
            component={LiveDetectionScreen}
            options={{
              title: 'Live Detection',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'Settings',
            }}
          />
          <Stack.Screen
            name="History"
            component={DetectionHistoryScreen}
            options={{
              title: 'Detection History',
            }}
          />
          <Stack.Screen
            name="Tutorial"
            component={TutorialScreen}
            options={{
              title: 'Tutorial',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
