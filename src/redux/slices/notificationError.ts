import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface Toast {
    id: string;
    message: string;
}

interface initialNotificationError {
    isError: boolean;
    toast: Toast[];
}

const initialState: initialNotificationError = {
    isError: false,
    toast: [],
}

export const notificationErrorSlice = createSlice({
    name: 'notificationError',
    initialState,
    reducers: {
        addErrorToast(state, action: PayloadAction<Omit<Toast, 'id'>>) {
            state.isError = true;
            state.toast.push({id: Math.random().toString(36).slice(2, 9), message: action.payload.message});
        },
        removeErrorToast(state, action: PayloadAction<string>) {
            state.isError = false;
            state.toast = state.toast.filter(toast => toast.id !== action.payload);
        },
    },
})

export default notificationErrorSlice.reducer;