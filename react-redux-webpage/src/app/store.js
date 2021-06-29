import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../components/TorontoListItem';

// Store for the counter reducer
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
