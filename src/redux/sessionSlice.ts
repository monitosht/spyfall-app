import { createSlice } from '@reduxjs/toolkit'

interface SessionState {
    nickname: string;
    gamepin: string;
}

const initialState = {
    nickname: '',
    gamepin: '',
}

const sessionSlice = createSlice({
    name: 'session',
    initialState: initialState as SessionState,
    reducers: {
        setNickname: (state, action) => {
            state.nickname = action.payload
        },
        setGamepin: (state, action) => {
            state.gamepin = action.payload
        },
        resetDefaults: () => {
            return initialState
        }
    },
});

export const { setNickname, setGamepin, resetDefaults } = sessionSlice.actions
export default sessionSlice.reducer