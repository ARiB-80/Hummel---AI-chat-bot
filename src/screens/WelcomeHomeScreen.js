import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function WelcomeHomeScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.card }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backText, { color: theme.text }]}>‹</Text>
      </TouchableOpacity>

      <View style={styles.centerContainer}>
        <Image
          source={require('../../assets/icon.png')}
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

      <View style={[styles.bottomNav, { backgroundColor: theme.navBg, borderTopColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.navigate('HummelInstructions')}>
          <Text style={[styles.navIcon, { color: theme.subText }]}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Text style={[styles.navIcon, { color: theme.subText }]}>🕐</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={[styles.navIcon, { color: theme.subText }]}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 60 },
  backButton: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center', marginBottom: 30,
  },
  backText: { fontSize: 24 },
  centerContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  logo: { width: 60, height: 60, resizeMode: 'contain', marginBottom: 24 },
  title: {
    fontSize: 28, fontWeight: 'bold',
    textAlign: 'center', lineHeight: 38, marginBottom: 12,
  },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 40 },
  getStartedButton: {
    paddingVertical: 16, paddingHorizontal: 60, borderRadius: 50, alignItems: 'center',
  },
  getStartedText: { fontSize: 16, fontWeight: '600' },
  bottomNav: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingVertical: 16, borderTopWidth: 1,
  },
  navIcon: { fontSize: 22 },
});