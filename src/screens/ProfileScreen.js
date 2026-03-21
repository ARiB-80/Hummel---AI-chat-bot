import React from 'react';
import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, Switch
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.card }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backText, { color: theme.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/robot.jpeg')}
            style={styles.avatar}
          />
          <View style={styles.onlineDot} />
        </View>
        <Text style={[styles.name, { color: theme.text }]}>Tom Hillson</Text>
        <Text style={[styles.email, { color: theme.subText }]}>Tomhill@mail.com</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <View style={styles.optionRow}>
          <Text style={styles.optionIcon}>🌙</Text>
          <Text style={[styles.optionText, { color: theme.text }]}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#e0e0e0', true: '#000000' }}
            thumbColor={'#ffffff'}
          />
        </View>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.optionIcon}>→</Text>
          <Text style={[styles.optionText, { color: theme.text }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.navBg, borderTopColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.navigate('HummelInstructions')}>
          <Text style={[styles.navIcon, { color: theme.subText }]}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Text style={[styles.navIcon, { color: theme.subText }]}>🕐</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.navIcon, { color: theme.text }]}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00cc44',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  optionsContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  optionIcon: {
    fontSize: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  navIcon: {
    fontSize: 22,
  },
});