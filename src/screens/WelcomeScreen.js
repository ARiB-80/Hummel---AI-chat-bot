import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to{'\n'}Hummel</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
    marginBottom: -70,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  loginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  signupText: {
    color: '#888888',
    fontSize: 16,
    fontWeight: '500',
  },
});