import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import chatReducer from './chatSlice';

const STORAGE_KEY = 'hummel_conversations';

async function loadState() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (!saved) return undefined;
    return {
      chat: {
        conversations: JSON.parse(saved),
        currentMessages: [],
      },
    };
  } catch {
    return undefined;
  }
}

function saveState(state) {
  AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.chat.conversations),
  ).catch(() => {});
}

let store;

export async function initStore() {
  const preloadedState = await loadState();
  store = configureStore({
    reducer: { chat: chatReducer },
    preloadedState,
  });
  store.subscribe(() => saveState(store.getState()));
  return store;
}

// Synchronous fallback store used until initStore() resolves
store = configureStore({
  reducer: { chat: chatReducer },
});

export { store };
