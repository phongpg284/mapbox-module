import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    accessToken?: string
    role?: string
    id?: string
    avatar?: string
}

const initialState: Partial<AuthState> = {
    accessToken: '',
    role: '',
    id: '',
    avatar: '',
}

export const authSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        updateToken: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken
            state.role = action.payload.role
            state.id = action.payload.id
            state.avatar = action.payload.avatar
        },
        clearToken: (state) => {
            state.accessToken = ''
            state.role = ''
            state.id = ''
            state.avatar = ''
        },
    },
})

export const { updateToken } = authSlice.actions
export const { clearToken } = authSlice.actions
export default authSlice.reducer
