import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, ScrollView
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { deleteConversation } from '../redux/chatSlice';

export default function HistoryScreen({ navigation }) {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const conversations = useSelector(state => state.chat.conversations);

  const filtered = conversations.filter(conv =>
    conv.title.toLowerCase().includes(search.toLowerCase())
  );

  const today = filtered.filter(conv => conv.date === new Date().toLocaleDateString());
  const older = filtered.filter(conv => conv.date !== new Date().toLocaleDateString());

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
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Today</Text>
            {today.map(conv => (
              <TouchableOpacity
                key={conv.id}
                style={[styles.historyItem, { backgroundColor: theme.card }]}
                onPress={() => navigation.navigate('HummelChat', { initialMessage: conv.title })}
                onLongPress={() => dispatch(deleteConversation(conv.id))}
              >
                <Text style={[styles.historyText, { color: theme.subText }]}>{conv.title}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {older.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Older</Text>
            {older.map(conv => (
              <TouchableOpacity
                key={conv.id}
                style={[styles.historyItem, { backgroundColor: theme.card }]}
                onPress={() => navigation.navigate('HummelChat', { initialMessage: conv.title })}
                onLongPress={() => dispatch(deleteConversation(conv.id))}
              >
                <Text style={[styles.historyText, { color: theme.subText }]}>{conv.title}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {filtered.length === 0 && (
          <Text style={[styles.emptyText, { color: theme.subText }]}>
            No conversations yet!{'\n'}Start chatting to see history here.
          </Text>
        )}
      </ScrollView>

      <View style={[styles.bottomNav, { backgroundColor: theme.navBg, borderTopColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.navigate('HummelInstructions')}>
          <Text style={[styles.navIcon, { color: theme.subText }]}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.navIcon, { color: theme.text }]}>🕐</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={[styles.navIcon, { color: theme.subText }]}>👤</Text>
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
  title: { fontSize: 28, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, marginTop: 8 },
  historyItem: { borderRadius: 12, padding: 14, marginBottom: 8 },
  historyText: { fontSize: 14 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 15, lineHeight: 26 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  navIcon: { fontSize: 22 },
});