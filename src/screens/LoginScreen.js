import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.card }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backText, { color: theme.text }]}>‹</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Login Your{'\n'}Account</Text>

      <View style={styles.form}>
        <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
          <Text style={styles.inputIcon}>✉</Text>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="JosephRen@Mail.Com"
            placeholderTextColor={theme.subText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="············"
            placeholderTextColor={theme.subText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.inputIcon}>{showPassword ? '👁' : '🙈'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={[styles.forgotText, { color: theme.subText }]}>Forget Password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: theme.buttonBg }]}
          onPress={() => navigation.navigate('WelcomeHome')}
        >
          <Text style={[styles.loginText, { color: theme.buttonText }]}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={[styles.signupText, { color: theme.subText }]}>Create New Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.signupLink, { color: theme.text }]}>Sign up</Text>
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
  forgotContainer: { alignItems: 'flex-end' },
  forgotText: { fontSize: 14 },
  loginButton: { paddingVertical: 16, borderRadius: 50, alignItems: 'center', marginTop: 8 },
  loginText: { fontSize: 16, fontWeight: '600' },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  signupText: { fontSize: 14 },
  signupLink: { fontSize: 14, fontWeight: 'bold' },
});