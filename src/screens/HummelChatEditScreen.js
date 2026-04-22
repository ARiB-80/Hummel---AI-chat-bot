import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, FlatList, KeyboardAvoidingView, Platform
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useDispatch } from 'react-redux';
import { saveConversation } from '../redux/chatSlice';
import { sendToGemini } from '../services/grokService';

export default function HummelChatEditScreen({ navigation, route }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const {
    message = '',
    messages: originalMessages = [],
    messageIndex = 0,
    conversationId = Date.now().toString(),
  } = route?.params ?? {};

  const history = originalMessages.slice(0, messageIndex);

  const [editText, setEditText] = useState(message);
  const [isEditing, setIsEditing] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayMessages, setDisplayMessages] = useState(history);
  const [errorText, setErrorText] = useState(null);

  const handleSaveSubmit = async () => {
    if (!editText.trim()) return;
    setIsEditing(false);
    setIsGenerating(true);
    setErrorText(null);

    const editedUserMsg = { id: Date.now().toString(), text: editText.trim(), sender: 'user' };
    const thinkingMsg = { id: 'thinking', sender: 'thinking' };
    setDisplayMessages([...history, editedUserMsg, thinkingMsg]);

    try {
      const responseText = await sendToGemini(editText.trim(), history);
      const aiMsg = { id: (Date.now() + 1).toString(), text: responseText, sender: 'ai' };
      const newMessages = [...history, editedUserMsg, aiMsg];

      setDisplayMessages(newMessages);
      dispatch(saveConversation({
        id: conversationId,
        title: newMessages[0].text,
        messages: newMessages,
      }));
    } catch (err) {
      setErrorText('Something went wrong. Please try again.');
      setDisplayMessages([...history, editedUserMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.card }]}
          onPress={() => navigation.navigate('MainTabs', { screen: 'History' })}
        >
          <Text style={[styles.backText, { color: theme.text }]}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.menuDots, { color: theme.text }]}>•••</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={isEditing ? history : displayMessages}
        keyExtractor={(item, i) => item.id ?? String(i)}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        ListFooterComponent={
          isEditing ? (
            <View style={[styles.editContainer, { backgroundColor: theme.card }]}>
              <TextInput
                style={[styles.editInput, { color: theme.text }]}
                value={editText}
                onChangeText={setEditText}
                multiline
                autoFocus
              />
              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: theme.buttonBg }]}
                  onPress={handleSaveSubmit}
                >
                  <Text style={[styles.saveText, { color: theme.buttonText }]}>Save & Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.cancelButton, { backgroundColor: theme.card }]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={[styles.cancelText, { color: theme.text }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }
        renderItem={({ item }) => {
          if (item.sender === 'thinking') {
            return (
              <View style={[styles.messageBubble, { backgroundColor: theme.inputBg, alignSelf: 'flex-start' }]}>
                <Text style={[styles.thinkingText, { color: theme.subText }]}>Hummel is thinking...</Text>
              </View>
            );
          }
          return (
            <View style={[
              styles.messageBubble,
              item.sender === 'user'
                ? { backgroundColor: theme.card, alignSelf: 'flex-end' }
                : { backgroundColor: theme.inputBg, alignSelf: 'flex-start' },
            ]}>
              <Text style={[styles.messageText, { color: theme.text }]}>{item.text}</Text>
            </View>
          );
        }}
      />

      {errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}

      {!isEditing && !isGenerating && (
        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: theme.buttonBg }]}
          onPress={() => navigation.navigate('MainTabs', { screen: 'History' })}
        >
          <Text style={[styles.doneText, { color: theme.buttonText }]}>Done — View in History</Text>
        </TouchableOpacity>
      )}
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
  messageBubble: { maxWidth: '80%', borderRadius: 16, padding: 12 },
  messageText: { fontSize: 14, lineHeight: 22 },
  thinkingText: { fontSize: 14, fontStyle: 'italic' },
  editContainer: { borderRadius: 16, padding: 12, gap: 8, marginTop: 8 },
  editInput: { fontSize: 14, lineHeight: 22 },
  editButtons: { flexDirection: 'row', gap: 8 },
  saveButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  saveText: { fontSize: 13, fontWeight: '600' },
  cancelButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  cancelText: { fontSize: 13 },
  errorContainer: { paddingHorizontal: 24, paddingBottom: 8 },
  errorText: { fontSize: 13, color: '#cc0000', textAlign: 'center' },
  doneButton: {
    alignSelf: 'center', paddingHorizontal: 32,
    paddingVertical: 12, borderRadius: 24, marginBottom: 24,
  },
  doneText: { fontSize: 14, fontWeight: '600' },
});
