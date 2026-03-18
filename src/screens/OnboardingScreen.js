import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/robot.jpeg')}
          style={styles.image}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Chat With Your{'\n'}Favourite Ai</Text>
        <Text style={styles.subtitle}>
          Chat with the smartest AI Future{'\n'}Experience power of AI with us
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrowText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.replace('Welcome')}
        >
          <Text style={styles.arrowText}>→</Text>
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
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  imageContainer: {
    width: '100%',
    height: '65%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#424141',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  arrowButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 24,
    color: '#000000',
  },
});