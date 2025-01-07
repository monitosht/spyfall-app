import { createSlice } from '@reduxjs/toolkit'

interface SessionState {
    nickname: string;
    playerId: string;
    isHost: boolean;
    gamepin: string;
}

const initialState = {
    nickname: '',
    playerId: '',
    isHost: false,
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
        setIsHost: (state, action) => {
            state.isHost = action.payload
        },
        setGamepin: (state, action) => {
            state.gamepin = action.payload
        },
        resetDefaults: () => {
            return initialState
        }
    },
});

export const { setNickname, setPlayerId, setIsHost, setGamepin, resetDefaults } = sessionSlice.actions
export default sessionSlice.reducer