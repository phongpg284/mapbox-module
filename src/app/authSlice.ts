import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    accessToken?: string
    role?: string
    id?: string
    avatar?: string
    name?: string
}

const initialState: Partial<AuthState> = {
    accessToken: '',
    role: '',
    id: '',
    avatar: '',
    name: '',
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
            state.name = action.payload.name
        },
        clearToken: (state) => {
            state.accessToken = ''
            state.role = ''
            state.id = ''
            state.avatar = ''
            state.name = ''
        },
    },
})

export const { updateToken } = authSlice.actions
export const { clearToken } = authSlice.actions
export default authSlice.reducer
