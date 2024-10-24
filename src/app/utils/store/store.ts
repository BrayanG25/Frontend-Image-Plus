import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    accessToken: typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;
            if (typeof window !== 'undefined') localStorage.setItem('access_token', action.payload);
        },
        clearAuthToken : (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            if (typeof window !== 'undefined') localStorage.removeItem('access_token');
            if (typeof window !== 'undefined') localStorage.removeItem('favorites');
        }
    }
});

export const { setAuthToken, clearAuthToken  } = authSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;