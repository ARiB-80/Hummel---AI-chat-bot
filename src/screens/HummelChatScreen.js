import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, FlatList, KeyboardAvoidingView, Platform
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useDispatch } from 'react-redux';
import { addMessage, saveConversation } from '../redux/chatSlice';

export default function HummelChatScreen({ navigation, route }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const initialMessage = route?.params?.initialMessage;
    if (initialMessage) {
      const userMessage = {
        id: Date.now().toString(),
        text: initialMessage,
        sender: 'user'
      };
      setMessages([userMessage]);
      dispatch(addMessage(userMessage));
      setIsGenerating(true);
      setTimeout(() => {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: 'This is a placeholder response. API integration coming soon!',
          sender: 'ai'
        };
        setMessages(prev => [...prev, aiMessage]);
        dispatch(addMessage(aiMessage));
        setIsGenerating(false);
      }, 1500);
    }
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    dispatch(addMessage(userMessage));
    setInput('');
    setIsGenerating(true);
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: 'This is a placeholder response. API integration coming soon!',
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiMessage]);
      dispatch(addMessage(aiMessage));
      setIsGenerating(false);
    }, 1500);
  };

  const handleBack = () => {
    if (messages.length > 0) {
      dispatch(saveConversation({
        title: messages[0].text,
        messages: messages,
      }));
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.card }]}
          onPress={handleBack}
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
          <View style={[
            styles.bubbleRow,
            item.sender === 'user' ? styles.userRow : styles.aiRow
          ]}>
            <View style={[
              styles.messageBubble,
              item.sender === 'user'
                ? { backgroundColor: theme.card }
                : { backgroundColor: theme.inputBg }
            ]}>
              <Text style={[styles.messageText, { color: theme.text }]}>{item.text}</Text>
            </View>
            {item.sender === 'user' && (
              <TouchableOpacity
                onPress={() => navigation.navigate('HummelChatEdit', { message: item.text })}
              >
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {isGenerating && (
        <TouchableOpacity
          style={[styles.stopButton, { backgroundColor: theme.card }]}
          onPress={() => setIsGenerating(false)}
        >
          <Text style={[styles.stopText, { color: theme.text }]}>⬛ Stop generating...</Text>
        </TouchableOpacity>
      )}

      {messages.length > 0 && !isGenerating && (
        <TouchableOpacity
          style={[styles.regenerateButton, { backgroundColor: theme.card }]}
          onPress={() => {
            setIsGenerating(true);
            setTimeout(() => {
              const aiMessage = {
                id: Date.now().toString(),
                text: 'This is a regenerated response. API integration coming soon!',
                sender: 'ai'
              };
              setMessages(prev => [...prev, aiMessage]);
              dispatch(addMessage(aiMessage));
              setIsGenerating(false);
            }, 1500);
          }}
        >
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
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: theme.card }]}
          onPress={sendMessage}
        >
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
  bubbleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  userRow: { justifyContent: 'flex-end' },
  aiRow: { justifyContent: 'flex-start' },
  messageBubble: { maxWidth: '80%', borderRadius: 16, padding: 12 },
  messageText: { fontSize: 14, lineHeight: 22 },
  editIcon: { fontSize: 14 },
  stopButton: {
    alignSelf: 'center', paddingHorizontal: 24,
    paddingVertical: 12, borderRadius: 24, marginBottom: 12,
  },
  stopText: { fontSize: 14 },
  regenerateButton: {
    alignSelf: 'center', paddingHorizontal: 24,
    paddingVertical: 12, borderRadius: 24, marginBottom: 12,
  },
  regenerateText: { fontSize: 14 },
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