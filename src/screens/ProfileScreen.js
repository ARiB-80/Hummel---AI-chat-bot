import React from 'react';
import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, Alert
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function ProfileScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              });
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={{ width: 36 }} />
        <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/robot.jpeg')}
            style={styles.avatar}
          />
          <View style={styles.onlineDot} />
        </View>
        <Text style={[styles.name, { color: theme.text }]}>
          {auth.currentUser?.email?.split('@')[0] || 'User'}
        </Text>
        <Text style={[styles.email, { color: theme.subText }]}>
          {auth.currentUser?.email || ''}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionRow}>
          <Text style={styles.optionIcon}>🌙</Text>
          <Text style={[styles.optionText, { color: theme.text }]}>Dark Mode</Text>
          <TouchableOpacity
            style={[styles.toggle, { backgroundColor: isDark ? '#000000' : '#e0e0e0' }]}
            onPress={toggleTheme}
          >
            <View style={[styles.toggleCircle, {
              alignSelf: isDark ? 'flex-end' : 'flex-start'
            }]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.optionRow} onPress={handleLogout}>
          <Text style={styles.optionIcon}>→</Text>
          <Text style={[styles.optionText, { color: theme.text }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  profileContainer: { alignItems: 'center', paddingVertical: 30 },
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  onlineDot: {
    position: 'absolute', bottom: 2, right: 2,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#00cc44', borderWidth: 2, borderColor: '#ffffff',
  },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  email: { fontSize: 14 },
  optionsContainer: { paddingHorizontal: 24, gap: 8 },
  optionRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16, gap: 12,
  },
  optionIcon: { fontSize: 20 },
  optionText: { flex: 1, fontSize: 16 },
  toggle: {
    width: 50, height: 28,
    borderRadius: 14, padding: 2,
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 24, height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
});
