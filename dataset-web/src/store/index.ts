import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice.ts';

export * from './alert.slice';
export * from './auth.slice.ts';

export type AppDispatch = typeof store.dispatch;
export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer
    },
});