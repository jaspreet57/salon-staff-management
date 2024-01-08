import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import staffReducer from './staff/staffSlice';

export const store = configureStore({
  reducer: {
    staff: staffReducer
  },
  devTools: false,
  preloadedState: {}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;