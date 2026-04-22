import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme/ThemeContext";
import { useDispatch } from "react-redux";
import { deleteConversation } from "../redux/chatSlice";

const STORAGE_KEY = "hummel_conversations";

export default function HistoryScreen({ navigation }) {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
        setConversations(saved ? JSON.parse(saved) : []);
      });
    }, [])
  );

  const filtered = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(search.toLowerCase()),
  );

  const today = filtered.filter(
    (conv) => conv.date === new Date().toLocaleDateString(),
  );
  const older = filtered.filter(
    (conv) => conv.date !== new Date().toLocaleDateString(),
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>History</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 20 }}>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search..."
          placeholderTextColor={theme.subText}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {today.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Today
            </Text>
            {today.map((conv) => (
              <TouchableOpacity
                key={conv.id}
                style={[styles.historyItem, { backgroundColor: theme.card }]}
                onPress={() =>
                  navigation.navigate("HummelChat", {
                    existingId: conv.id,
                    existingMessages: conv.messages,
                  })
                }
                onLongPress={() => {
                  dispatch(deleteConversation(conv.id));
                  setConversations((prev) => prev.filter((c) => c.id !== conv.id));
                }}
              >
                <Text style={[styles.historyText, { color: theme.subText }]}>
                  {conv.title}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {older.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Older
            </Text>
            {older.map((conv) => (
              <TouchableOpacity
                key={conv.id}
                style={[styles.historyItem, { backgroundColor: theme.card }]}
                onPress={() =>
                  navigation.navigate("HummelChat", {
                    existingId: conv.id,
                    existingMessages: conv.messages,
                  })
                }
                onLongPress={() => {
                  dispatch(deleteConversation(conv.id));
                  setConversations((prev) => prev.filter((c) => c.id !== conv.id));
                }}
              >
                <Text style={[styles.historyText, { color: theme.subText }]}>
                  {conv.title}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {filtered.length === 0 && (
          <Text style={[styles.emptyText, { color: theme.subText }]}>
            No conversations yet!{"\n"}Start chatting to see history here.
          </Text>
        )}
      </ScrollView>
    </View>
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
  title: { fontSize: 28, fontWeight: "bold" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 15 },
  scrollView: { flex: 1, paddingHorizontal: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 8,
  },
  historyItem: { borderRadius: 12, padding: 14, marginBottom: 8 },
  historyText: { fontSize: 14 },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
    lineHeight: 26,
  },
});
