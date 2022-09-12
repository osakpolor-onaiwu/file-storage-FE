import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    isLoading: false,
    items: [],
}

export const history = createAsyncThunk('history/uploads', (query, { dispatch, getState, rejectWithValue }) => {
    // const query_string = JSON.stringify(query);

    return axios
        .get(`${process.env.REACT_APP_BASEURL}/uploads/search?${query}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
        })
        .then(res => {
            console.log('history',res);
            return {
                data: res.data
            }
         }).catch(e => {
            return rejectWithValue(e.response.data)
        })
})

export const deletes = createAsyncThunk('history/delete', (id, { dispatch, getState, rejectWithValue }) => {
    // const query_string = JSON.stringify(query);

    return axios
        .post(`${process.env.REACT_APP_BASEURL}/uploads/delete`,{ id }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
        })
        .then(res => {
            console.log('history del--',res);
            return {
                data: res.data
            }
         }).catch(e => {
            console.log('history del err--',e);
            return rejectWithValue(e.response.data)
        })
})

const history_slice = createSlice({
    name: 'history',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(history.pending, state => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(history.fulfilled, (state, action)=> {
            return {
                ...state,
                isLoading: false,
                items:action.payload.data
            }
        })
        builder.addCase(history.rejected, state => {
            return {
                ...state,
                isLoading: false
            }
        })
        builder.addCase(deletes.pending, state => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(deletes.fulfilled, (state, action)=> {
            return {
                ...state,
                isLoading: false,
            }
        })
        builder.addCase(deletes.rejected, state => {
            return {
                ...state,
                isLoading: false
            }
        })
    }
})

export default history_slice.reducer;