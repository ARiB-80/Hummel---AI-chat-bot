import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function WelcomeHomeScreen({ navigation }) {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.centerContainer}>
        <Image
          source={isDark ? require('../../assets/logo-white.jpeg') : require('../../assets/logo-dark.jpeg')}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: theme.text }]}>Welcome to{'\n'}Hummel</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Start chatting with ChattyAI now..{'\n'}You can ask me anything
        </Text>

        <TouchableOpacity
          style={[styles.getStartedButton, { backgroundColor: theme.buttonBg }]}
          onPress={() => navigation.navigate('HummelInstructions')}
        >
          <Text style={[styles.getStartedText, { color: theme.buttonText }]}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 300, height: 300, resizeMode: 'contain', marginBottom: -70 },
  title: {
    fontSize: 28, fontWeight: 'bold',
    textAlign: 'center', lineHeight: 38, marginBottom: 12,
  },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 40 },
  getStartedButton: {
    paddingVertical: 16, paddingHorizontal: 60, borderRadius: 50, alignItems: 'center',
  },
  getStartedText: { fontSize: 16, fontWeight: '600' },
});
