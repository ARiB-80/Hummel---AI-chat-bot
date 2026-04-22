import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('MainTabs');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.card }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backText, { color: theme.text }]}>‹</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Create your{'\n'}Account</Text>

      <View style={styles.form}>
        <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Full Name"
            placeholderTextColor={theme.subText}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
          <Text style={styles.inputIcon}>✉</Text>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Enter Your Email"
            placeholderTextColor={theme.subText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Password"
            placeholderTextColor={theme.subText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.inputIcon}>{showPassword ? '👁' : '🙈'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.registerButton, { backgroundColor: theme.buttonBg }]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={[styles.registerText, { color: theme.buttonText }]}>
            {loading ? 'Creating Account...' : 'Register'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={[styles.loginText, { color: theme.subText }]}>Already Have An Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginLink, { color: theme.text }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, lineHeight: 42 },
  form: { gap: 16 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 15 },
  registerButton: { paddingVertical: 16, borderRadius: 50, alignItems: 'center', marginTop: 8 },
  registerText: { fontSize: 16, fontWeight: '600' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  loginText: { fontSize: 14 },
  loginLink: { fontSize: 14, fontWeight: 'bold' },
});