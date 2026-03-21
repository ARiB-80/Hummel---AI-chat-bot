import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function OnboardingScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/robot.jpeg')}
          style={styles.image}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Chat With Your{'\n'}Favourite Ai</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Chat with the smartest AI Future{'\n'}Experience power of AI with us
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.arrowButton, { backgroundColor: theme.card }]}>
          <Text style={[styles.arrowText, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.arrowButton, { backgroundColor: theme.card }]}
          onPress={() => navigation.replace('Welcome')}
        >
          <Text style={[styles.arrowText, { color: theme.text }]}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 40,
  },
  imageContainer: {
    width: '90%', height: 430,
    borderRadius: 30, overflow: 'hidden',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  textContainer: { alignItems: 'center', paddingHorizontal: 30 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  buttonContainer: { flexDirection: 'row', gap: 16 },
  arrowButton: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
  },
  arrowText: { fontSize: 20 },
});