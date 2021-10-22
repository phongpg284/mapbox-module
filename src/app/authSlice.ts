import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    accessToken?: string
    role?: string
    id?: string
}

const initialState: Partial<AuthState> = {
    accessToken: '',
    role: '',
    id: '',
}

export const authSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        updateToken: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken
            state.role = action.payload.role
            state.id = action.payload.id
        },
    },
})

export const { updateToken } = authSlice.actions
export default authSlice.reducer
