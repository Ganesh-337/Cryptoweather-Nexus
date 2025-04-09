import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    theme: 'light',
    notifications: true,
    refreshInterval: 5, // minutes
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    setRefreshInterval: (state, action) => {
      state.refreshInterval = action.payload;
    },
  },
});

export const { setTheme, toggleNotifications, setRefreshInterval } = userSlice.actions;
export default userSlice.reducer; 