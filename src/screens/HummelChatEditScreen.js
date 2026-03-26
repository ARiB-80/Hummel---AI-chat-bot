import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, FlatList, KeyboardAvoidingView, Platform
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function HummelChatEditScreen({ navigation, route }) {
  const { theme } = useTheme();
  const initialMessage = route?.params?.message || 'Top 6 Movies With High Imdb';
  const [messages, setMessages] = useState([
    { id: '1', text: initialMessage, sender: 'user' },
    { id: '2', text: 'As an AI, I don\'t have real-time access to IMDb\'s rankings, and my training only goes up until September 2021. However, I can provide you with a list of critically acclaimed movies that were highly rated at that time.', sender: 'ai' },
  ]);
  const [editText, setEditText] = useState(initialMessage);
  const [isEditing, setIsEditing] = useState(true);
  const [input, setInput] = useState('');

  const handleSaveSubmit = () => {
    setMessages(prev => prev.map(m =>
      m.id === '1' ? { ...m, text: editText } : m
    ));
    setIsEditing(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        renderItem={({ item }) => (
          item.sender === 'user' && isEditing ? (
            <View style={[styles.editContainer, { backgroundColor: theme.card }]}>
              <TextInput
                style={[styles.editInput, { color: theme.text }]}
                value={editText}
                onChangeText={setEditText}
                multiline
              />
              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: theme.buttonBg }]}
                  onPress={handleSaveSubmit}
                >
                  <Text style={[styles.saveText, { color: theme.buttonText }]}>Save&Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.cancelButton, { backgroundColor: theme.card }]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={[styles.cancelText, { color: theme.text }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[
              styles.messageBubble,
              item.sender === 'user'
                ? { backgroundColor: theme.card, alignSelf: 'flex-end' }
                : { backgroundColor: theme.inputBg, alignSelf: 'flex-start' }
            ]}>
              <Text style={[styles.messageText, { color: theme.text }]}>{item.text}</Text>
            </View>
          )
        )}
      />

      {!isEditing && (
        <TouchableOpacity style={[styles.regenerateButton, { backgroundColor: theme.card }]}>
          <Text style={[styles.regenerateText, { color: theme.text }]}>↻  Regenerate Response</Text>
        </TouchableOpacity>
      )}

      <View style={[styles.inputContainer, { borderTopColor: theme.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text }]}
          placeholder="Send a message"
          placeholderTextColor={theme.subText}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.card }]}>
          <Text style={[styles.sendText, { color: theme.text }]}>›</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  messagesList: { flex: 1 },
  messagesContent: { paddingHorizontal: 24, paddingVertical: 16, gap: 12 },
  editContainer: { borderRadius: 16, padding: 12, gap: 8 },
  editInput: { fontSize: 14, lineHeight: 22 },
  editButtons: { flexDirection: 'row', gap: 8 },
  saveButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  saveText: { fontSize: 13, fontWeight: '600' },
  cancelButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  cancelText: { fontSize: 13 },
  messageBubble: { maxWidth: '80%', borderRadius: 16, padding: 12 },
  messageText: { fontSize: 14, lineHeight: 22 },
  regenerateButton: {
    alignSelf: 'center', paddingHorizontal: 24,
    paddingVertical: 12, borderRadius: 24, marginBottom: 12,
  },
  regenerateText: { fontSize: 14 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, gap: 8,
  },
  input: { flex: 1, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15 },
  sendButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  sendText: { fontSize: 24 },
});