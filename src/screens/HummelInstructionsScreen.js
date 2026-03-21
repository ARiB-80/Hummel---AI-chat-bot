import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function HummelInstructionsScreen({ navigation }) {
  const { theme } = useTheme();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    navigation.navigate('HummelChat', { initialMessage: input });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.card }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backText, { color: theme.text }]}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.menuDots, { color: theme.text }]}>•••</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Hummel</Text>
        <View style={[styles.infoBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.infoText, { color: theme.subText }]}>
            Remembers what user said{'\n'}earlier in the conversation
          </Text>
        </View>
        <View style={[styles.infoBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.infoText, { color: theme.subText }]}>
            Allows user to provide{'\n'}follow-up corrections With AI
          </Text>
        </View>
      </View>

      <View style={[styles.inputContainer, { borderTopColor: theme.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text }]}
          placeholder="Send a message"
          placeholderTextColor={theme.subText}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: theme.card }]}
          onPress={handleSend}
        >
          <Text style={[styles.sendText, { color: theme.text }]}>›</Text>
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
  backButton: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  backText: { fontSize: 24 },
  menuDots: { fontSize: 16, letterSpacing: 2 },
  centerContainer: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center', paddingHorizontal: 24, gap: 16,
  },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  infoBox: { width: '100%', borderRadius: 12, padding: 16, alignItems: 'center' },
  infoText: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, gap: 8,
  },
  input: {
    flex: 1, borderRadius: 24,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 15,
  },
  sendButton: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  sendText: { fontSize: 24 },
});