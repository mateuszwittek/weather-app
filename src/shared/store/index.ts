import { configureStore } from '@reduxjs/toolkit';
import { weatherSlice } from './slices/weatherSlice';

export const store = configureStore({
	reducer: {
		weather: weatherSlice.reducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { weatherActions } from './slices/weatherSlice';
