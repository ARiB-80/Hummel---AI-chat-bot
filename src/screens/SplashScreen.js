import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.appName}>Hummel</Text>
        <Text style={styles.version}>Version 1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -1,
  },
  version: {
    fontSize: 14,
    color: '#424040',
    marginTop: 2,
  },
});