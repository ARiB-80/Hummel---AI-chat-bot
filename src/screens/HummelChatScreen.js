import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useDispatch } from "react-redux";
import { addMessage, saveConversation } from "../redux/chatSlice";
import { sendToGemini } from "../services/grokService";

export default function HummelChatScreen({ navigation, route }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const abortRef = useRef(false);
  const conversationId = useRef(
    route?.params?.existingId ?? Date.now().toString()
  );

  // Keep a ref so the beforeRemove listener always sees the latest messages
  const messagesRef = useRef([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Save conversation whenever leaving this screen (back gesture, hardware back, or button)
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      const current = messagesRef.current.filter((m) => m.sender !== "thinking");
      if (current.length > 0) {
        dispatch(
          saveConversation({
            id: conversationId.current,
            title: current[0].text,
            messages: current,
          })
        );
      }
    });
    return unsubscribe;
  }, [navigation]);

  const fetchAiResponse = async (userText, history) => {
    abortRef.current = false;
    setIsGenerating(true);
    const thinkingId = "thinking";
    setMessages((prev) => [...prev, { id: thinkingId, sender: "thinking" }]);
    try {
      const responseText = await sendToGemini(userText, history);
      if (abortRef.current) return;
      const aiMessage = {
        id: Date.now().toString(),
        text: responseText,
        sender: "ai",
      };
      setMessages((prev) =>
        prev.filter((m) => m.id !== thinkingId).concat(aiMessage)
      );
      dispatch(addMessage(aiMessage));
    } catch (err) {
      if (!abortRef.current) {
        const errorMessage = {
          id: Date.now().toString(),
          text: "Something went wrong. Please try again.",
          sender: "error",
        };
        setMessages((prev) =>
          prev.filter((m) => m.id !== thinkingId).concat(errorMessage)
        );
      }
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const { initialMessage, existingMessages } = route?.params ?? {};
    if (existingMessages?.length > 0) {
      // Resuming a saved conversation — load messages without calling Gemini
      setMessages(existingMessages);
    } else if (initialMessage) {
      // Brand-new chat started from HummelInstructions
      const userMessage = {
        id: Date.now().toString(),
        text: initialMessage,
        sender: "user",
      };
      setMessages([userMessage]);
      dispatch(addMessage(userMessage));
      fetchAiResponse(initialMessage, []);
    }
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    dispatch(addMessage(userMessage));
    setInput("");
    fetchAiResponse(input, messages);
  };

  const handleBack = () => {
    navigation.navigate("MainTabs", { screen: "History" });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        renderItem={({ item, index }) => {
          if (item.sender === "thinking") {
            return (
              <View style={[styles.bubbleRow, styles.aiRow]}>
                <View style={[styles.messageBubble, { backgroundColor: theme.inputBg }]}>
                  <Text style={[styles.thinkingText, { color: theme.subText }]}>
                    Hummel is thinking...
                  </Text>
                </View>
              </View>
            );
          }
          if (item.sender === "error") {
            return (
              <View style={[styles.bubbleRow, styles.aiRow]}>
                <View style={[styles.messageBubble, styles.errorBubble]}>
                  <Text style={styles.errorText}>{item.text}</Text>
                </View>
              </View>
            );
          }
          return (
            <View
              style={[
                styles.bubbleRow,
                item.sender === "user" ? styles.userRow : styles.aiRow,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  item.sender === "user"
                    ? { backgroundColor: theme.card }
                    : { backgroundColor: theme.inputBg },
                ]}
              >
                <Text style={[styles.messageText, { color: theme.text }]}>
                  {item.text}
                </Text>
              </View>
              {item.sender === "user" && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("HummelChatEdit", {
                      message: item.text,
                      messages: messages,
                      messageIndex: index,
                      conversationId: conversationId.current,
                    })
                  }
                >
                  <Text style={styles.editIcon}>✏️</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />

      {isGenerating && (
        <TouchableOpacity
          style={[styles.stopButton, { backgroundColor: theme.card }]}
          onPress={() => {
            abortRef.current = true;
            setIsGenerating(false);
          }}
        >
          <Text style={[styles.stopText, { color: theme.text }]}>
            ⬛ Stop generating...
          </Text>
        </TouchableOpacity>
      )}

      {messages.length > 0 && !isGenerating && (
        <TouchableOpacity
          style={[styles.regenerateButton, { backgroundColor: theme.card }]}
          onPress={() => {
            const lastUser = [...messages]
              .reverse()
              .find((m) => m.sender === "user");
            if (lastUser) {
              const historyBeforeLast = messages.slice(
                0,
                messages.lastIndexOf(lastUser),
              );
              fetchAiResponse(lastUser.text, historyBeforeLast);
            }
          }}
        >
          <Text style={[styles.regenerateText, { color: theme.text }]}>
            ↻ Regenerate Response
          </Text>
        </TouchableOpacity>
      )}

      <View style={[styles.inputContainer, { borderTopColor: theme.border }]}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.inputBg, color: theme.text },
          ]}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { fontSize: 24 },
  menuDots: { fontSize: 16, letterSpacing: 2 },
  messagesList: { flex: 1 },
  messagesContent: { paddingHorizontal: 24, paddingVertical: 16, gap: 12 },
  bubbleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  userRow: { justifyContent: "flex-end" },
  aiRow: { justifyContent: "flex-start" },
  messageBubble: { maxWidth: "80%", borderRadius: 16, padding: 12 },
  messageText: { fontSize: 14, lineHeight: 22 },
  editIcon: { fontSize: 14 },
  thinkingText: { fontSize: 14, fontStyle: "italic" },
  errorBubble: { backgroundColor: "#fff0f0", borderWidth: 1, borderColor: "#ffcccc" },
  errorText: { fontSize: 14, color: "#cc0000" },
  stopButton: {
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 12,
  },
  stopText: { fontSize: 14 },
  regenerateButton: {
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 12,
  },
  regenerateText: { fontSize: 14 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  input: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: { fontSize: 24 },
});
