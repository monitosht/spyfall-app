import { createSlice } from "@reduxjs/toolkit";

interface MessageState {
    message: string;
}

const initialState: MessageState = {
    message: '',
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = '';
        },
    },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;