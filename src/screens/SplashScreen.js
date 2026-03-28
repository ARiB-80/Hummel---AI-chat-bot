import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function SplashScreen({ navigation }) {
  const { theme, isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.logoContainer}>
        <Image
          source={isDark ? require('../../assets/logo-white.jpeg') : require('../../assets/logo-dark.jpeg')}
          style={styles.logo}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={[styles.appName, { color: theme.text }]}>Hummel</Text>
        <Text style={[styles.version, { color: theme.subText }]}>Version 1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
  },
  logo: { width: 350, height: 350, resizeMode: 'contain' },
  bottomContainer: {
    position: 'absolute',
    bottom: 50, left: 0, right: 0, alignItems: 'center',
  },
  appName: { fontSize: 26, fontWeight: 'bold', letterSpacing: -1 },
  version: { fontSize: 14, marginTop: 2 },
});