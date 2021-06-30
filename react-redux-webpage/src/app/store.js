import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../components/RestaurantListItem';

// Store for the counter reducer
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
