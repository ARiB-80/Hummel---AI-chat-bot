import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, ScrollView
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const historyData = {
  today: [
    { id: '1', text: 'How Much Pushaps A day' },
    { id: '2', text: 'Top 10 Imdb Best Movies ever' },
    { id: '3', text: 'Tell me what support I played daily fitness' },
  ],
  yesterday: [
    { id: '4', text: 'How Much Pushaps A day' },
    { id: '5', text: 'Top 10 Imdb Best Movies ever' },
    { id: '6', text: 'How are you, friend? long time...', showDelete: true },
    { id: '7', text: 'Top 10 Imdb Best Movies ever' },
    { id: '8', text: 'Tell me what support I played daily fitness' },
  ],
};

export default function HistoryDeletedScreen({ navigation }) {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(historyData);

  const deleteItem = (id) => {
    setItems(prev => ({
      ...prev,
      yesterday: prev.yesterday.filter(item => item.id !== id)
    }));
  };

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
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Today</Text>
        {items.today.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.historyItem, { backgroundColor: theme.card }]}
          >
            <Text style={[styles.historyText, { color: theme.subText }]}>{item.text}</Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Yesterday</Text>
        {items.yesterday.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.historyItem, { backgroundColor: theme.card }]}
          >
            {item.showDelete && (
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            )}
            <Text style={[styles.historyText, { color: theme.subText }]}>{item.text}</Text>
          </TouchableOpacity>
        ))}
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
  historyItem: {
    borderRadius: 12, padding: 14, marginBottom: 8,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  deleteIcon: { fontSize: 16 },
  historyText: { fontSize: 14, flex: 1 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  navIcon: { fontSize: 22 },
});