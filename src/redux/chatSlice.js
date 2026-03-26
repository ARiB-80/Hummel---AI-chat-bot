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
      state.conversations.push({
        id: Date.now().toString(),
        title: action.payload.title,
        messages: action.payload.messages,
        date: new Date().toLocaleDateString(),
      });
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