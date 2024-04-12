import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlertMessage } from "../interfaces/alert.ts";

interface AlertState {
    value: IAlertMessage | null;
}

interface AlertPayload {
    summary: string
    detail: string
    sticky: boolean
}

const initialState: AlertState = {
    value: null
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        success(state, action: PayloadAction<AlertPayload>) {
            state.value = createAlertState('success', action.payload);
        },

        error(state, action: PayloadAction<AlertPayload>) {
            state.value = createAlertState('error', action.payload);
        },

        clear(state) {
            state.value = null;
        }
    }
});

const createAlertState = (type:  "success" | "info" | "warn" | "error" | "secondary" | "contrast", payload: AlertPayload): IAlertMessage => {
    return {
        severity: type,
        ...payload
    };
};

export const { success, error, clear } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
