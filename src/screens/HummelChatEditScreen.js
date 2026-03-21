import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, FlatList, KeyboardAvoidingView, Platform
} from 'react-native';

export default function HummelChatEditScreen({ navigation, route }) {
  const initialMessage = route?.params?.message || 'Top 6 Movies With High Imdb';
  const [messages, setMessages] = useState([
    { id: '1', text: initialMessage, sender: 'user' },
    { id: '2', text: 'As an AI, I don\'t have real-time access to IMDb\'s rankings, and my training only goes up until September 2021. However, I can provide you with a list of critically acclaimed movies that were highly rated at that time. Please note that opinions on the "best" movies can vary, and IMDb ratings may change over time. Here are ten highly regarded films as of September 2021.', sender: 'ai' },
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.menuDots}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        renderItem={({ item }) => (
          item.sender === 'user' && isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                value={editText}
                onChangeText={setEditText}
                multiline
              />
              <View style={styles.editButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveSubmit}>
                  <Text style={styles.saveText}>Save&Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[
              styles.messageBubble,
              item.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )
        )}
      />

      {/* Regenerate Button */}
      {!isEditing && (
        <TouchableOpacity style={styles.regenerateButton}>
          <Text style={styles.regenerateText}>↻  Regenerate Response</Text>
        </TouchableOpacity>
      )}

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Send a message"
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>›</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
    color: '#000000',
  },
  menuDots: {
    fontSize: 16,
    color: '#000000',
    letterSpacing: 2,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  editContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  editInput: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 22,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cancelText: {
    color: '#000000',
    fontSize: 13,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#f0f0f0',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8f8f8',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
  },
  regenerateButton: {
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 12,
  },
  regenerateText: {
    fontSize: 14,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000000',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    fontSize: 24,
    color: '#000000',
  },
});