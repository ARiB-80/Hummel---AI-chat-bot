import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function WelcomeScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: theme.text }]}>Welcome to{'\n'}Hummel</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: theme.buttonBg }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.loginText, { color: theme.buttonText }]}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signupButton, { backgroundColor: theme.card }]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.signupText, { color: theme.subText }]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center', paddingHorizontal: 30,
  },
  topContainer: { alignItems: 'center', marginBottom: 60 },
  logo: { width: 300, height: 300, resizeMode: 'contain', marginBottom: -40 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', lineHeight: 32 },
  buttonContainer: { width: '100%', gap: 12 },
  loginButton: { paddingVertical: 16, borderRadius: 50, alignItems: 'center' },
  loginText: { fontSize: 16, fontWeight: '600' },
  signupButton: { paddingVertical: 16, borderRadius: 50, alignItems: 'center' },
  signupText: { fontSize: 16, fontWeight: '500' },
});