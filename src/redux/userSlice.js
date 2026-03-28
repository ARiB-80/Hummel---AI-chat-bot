import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import userReducer from './userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveState = async (state) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('hummelState', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('hummelState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state:', error);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});