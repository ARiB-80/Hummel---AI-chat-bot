import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, ScrollView
} from 'react-native';

const historyData = {
  today: [
    { id: '1', text: 'How Much Pushaps A day' },
    { id: '2', text: 'Top 10 Imdb Best Movies ever' },
    { id: '3', text: 'Tell me what support I played daily fitness' },
  ],
  yesterday: [
    { id: '4', text: 'How Much Pushaps A day' },
    { id: '5', text: 'Top 10 Imdb Best Movies ever' },
    { id: '6', text: 'Tell me what support I played daily fitness' },
    { id: '7', text: 'Top 10 Imdb Best Movies ever' },
    { id: '8', text: 'Tell me what support I played daily fitness' },
  ],
};

export default function HistoryScreen({ navigation }) {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* History List */}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Today</Text>
        {historyData.today.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.historyItem}
            onPress={() => navigation.navigate('HummelChat', { initialMessage: item.text })}
            onLongPress={() => navigation.navigate('HistoryDeleted')}
          >
            <Text style={styles.historyText}>{item.text}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Yesterday</Text>
        {historyData.yesterday.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.historyItem}
            onPress={() => navigation.navigate('HummelChat', { initialMessage: item.text })}
            onLongPress={() => navigation.navigate('HistoryDeleted')}
          >
            <Text style={styles.historyText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HummelInstructions')}>
          <Text style={styles.navIcon}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.activeNav]}>🕐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  editIcon: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    marginTop: 8,
  },
  historyItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  historyText: {
    fontSize: 14,
    color: '#555555',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 22,
    color: '#888888',
  },
  activeNav: {
    color: '#000000',
  },
});