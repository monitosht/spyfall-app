import { createSlice } from '@reduxjs/toolkit'

interface SessionState {
    nickname: string;
    gamepin: string;
}

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        nickname: "",
        gamepin: "",
    } as SessionState,
    reducers: {
        setNickname: (state, action) => {
            state.nickname = action.payload
        },
        setGamepin: (state, action) => {
            state.gamepin = action.payload
        }
    },
});

export const { setNickname, setGamepin } = sessionSlice.actions
export default sessionSlice.reducer