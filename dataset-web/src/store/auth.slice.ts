import {createAsyncThunk, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITokens, IUser} from "../interfaces/users.ts";
import {Api} from "../api ";

export interface AuthState {
    user: IUser | null
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('auth') || 'null')
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ user: IUser } & ITokens | null>) {
            if (action.payload) {
                state.user = { ...action.payload.user, refreshToken: action.payload.refreshToken, accessToken: action.payload.accessToken } || null
            } else {
                state.user = null
            }
        },

        refreshTokens(state, action: PayloadAction<{accessToken: string, refreshToken: string}>) {
            if (state.user) {
                state.user.accessToken = action.payload?.accessToken
                state.user.refreshToken = action.payload?.refreshToken

                localStorage.setItem('auth', JSON.stringify({...state.user}));
            }
        },

        logout(state) {
            state.user = null

            localStorage.removeItem('auth');
        }
    }
});

export const selectAuthUser = (state:  any) => state.auth.user;

export const selectIsAuthenticated = createSelector(
    selectAuthUser,
    (user) => user !== null
);

export const refreshTokensLoop = createAsyncThunk<void, void, { state: { auth: AuthState} }>(
    'auth/refreshTokensLoop',
    async (_, { getState, dispatch }) => {
        try {
            const isUserSignedIn = getState().auth.user !== null;

            while (isUserSignedIn) {
                const tokens = await Api.Auth.RefreshToken(getState().auth.user?.accessToken as string).requestData()

                dispatch(refreshTokens(tokens))

                await new Promise(resolve => setTimeout(resolve, 4 * 60 * 1000)); // 4 minutes

                if (!getState().auth.user) break
            }
        } catch (error) {
            dispatch(logout());
        }
    }
);

export const { setAuth, logout, refreshTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;