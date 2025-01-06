import { createSlice } from '@reduxjs/toolkit'

interface SessionState {
    nickname: string;
    playerId: string;
    gamepin: string;
}

const initialState = {
    nickname: '',
    playerId: '',
    gamepin: '',
}

const sessionSlice = createSlice({
    name: 'session',
    initialState: initialState as SessionState,
    reducers: {
        setNickname: (state, action) => {
            state.nickname = action.payload
        },
        setPlayerId: (state, action) => {
            state.playerId = action.payload
        },
        setGamepin: (state, action) => {
            state.gamepin = action.payload
        },
        resetDefaults: () => {
            return initialState
        }
    },
});

export const { setNickname, setPlayerId, setGamepin, resetDefaults } = sessionSlice.actions
export default sessionSlice.reducer