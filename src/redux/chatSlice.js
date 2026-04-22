import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [],
    currentMessages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.currentMessages.push(action.payload);
    },
    clearMessages: (state) => {
      state.currentMessages = [];
    },
    saveConversation: (state, action) => {
      const { id, title, messages } = action.payload;
      const existing = state.conversations.findIndex(c => c.id === id);
      const conversation = { id, title, messages, date: new Date().toLocaleDateString() };
      if (existing >= 0) {
        state.conversations[existing] = conversation;
      } else {
        state.conversations.unshift(conversation);
      }
    },
    deleteConversation: (state, action) => {
      state.conversations = state.conversations.filter(
        conv => conv.id !== action.payload
      );
    },
  },
});

export const { addMessage, clearMessages, saveConversation, deleteConversation } = chatSlice.actions;
export default chatSlice.reducer;