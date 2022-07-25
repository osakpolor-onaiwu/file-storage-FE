import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { config_json } from '../headers';
import tokenConfig from '../token_config';

export const login = createAsyncThunk('auth/login', (user_details, { dispatch, getState, rejectWithValue }) => {
    const config = config_json;
    const body = JSON.stringify(user_details);

    return axios
        .post(`${process.env.REACT_APP_BASEURL}/user/login`, body, config)
        .then(res => {
            return {
                user: res.data.data,
                userDetail: user_details,
            }
        }).catch(e => {
            return rejectWithValue(e.response.data)
        })
})


export const signup = createAsyncThunk('auth/signup', (user, { dispatch, getState, rejectWithValue }) => {
    const config = config_json;
    const body = JSON.stringify(user)
    return axios
        .post(`${process.env.REACT_APP_BASEURL}/user/register`, body, config)
        .then(res => {
            return {
                newUser: res.data.data
            }
        }).catch(e => {
            return rejectWithValue(e.response.data)
        })
})

export const logout = createAsyncThunk('auth/logout', (user, { dispatch, getState, rejectWithValue }) => {

    return axios
        .post(`${process.env.REACT_APP_BASEURL}/user/logout`,user, tokenConfig(getState))
        .then(res => {
            return {
                user: res.data
            }
        }).catch(e => {
            return rejectWithValue(e.response.data)
        })
})

export const user = createAsyncThunk('auth/user', (_, { dispatch, getState, rejectWithValue }) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Authorization": `Bearer ${token} `
        }
    }
    const endpoint = `${process.env.REACT_APP_BASEURL}/user/user_detail`;
    // console.log({endpoint, token})
    return axios
        .get(endpoint, config)
        .then(res => {
            return {
                user: res.data.data
            }
        }).catch(e => {
            return rejectWithValue(e.response.data)
        })
})

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    signup_success: null,
}

const auth_slice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(signup.pending, state => {
            return {
                ...state,
                isLoading: true,
            };
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                signup_success: true
            };
        })
        builder.addCase(signup.rejected, (state, action) => {
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }
        })

        builder.addCase(login.pending, state => {
            state.isLoading = true;
        })

        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.user.token);
            localStorage.setItem("refresh_token", action.payload.user.refresh_token);
            const userDetail = JSON.stringify(action.payload.userDetail);
            localStorage.setItem("user details", userDetail);
            return {
                ...state,
                ...action.user,
                isAuthenticated: true,
                isLoading: false
            }

        })
        builder.addCase(login.rejected, (state, action) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user details");
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                token: null,
                loggedIn: null,
            };
        })

        builder.addCase(user.pending, state => {
            state.isLoading = true;
        })

        builder.addCase(user.fulfilled, (state, action) => {
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
            };
        })

        builder.addCase(user.rejected, (state, action) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user detail");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        })

        builder.addCase(logout.pending, state => {
            state.isLoading = true;
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user details");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        })
        builder.addCase(logout.rejected, (state, action) => {

        })
    }
})

export default auth_slice.reducer;

