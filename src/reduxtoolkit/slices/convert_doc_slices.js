import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { config_json } from '../headers';
import tokenConfig from '../token_config';
const initialState = {
    data_converted:'',
    percentage_completed: 0,
    isLoading: false,
    conversion_status:null,
    download_link: null,
}

export const convert_doc = createAsyncThunk('convert/doc', (payload, { dispatch, getState, rejectWithValue }) => {

    if (payload.url === null) delete payload.url;
    if (payload.raw_data === null) delete payload.raw_data;
    if (payload.file === null) delete payload.file;
    const options = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
        },
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            console.log(`${percent}% ${loaded}kb of ${total}`)
        }
    }
    return axios
        .post(`${process.env.REACT_APP_BASEURL}/docs/convert`, payload, options)
        .then(res => { }).catch(e => {
            return rejectWithValue(e.response.data)
        })
})


const convert_doc_slice = createSlice({
    name: "convert",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(convert_doc.pending, state => {
            return {
                ...state,
                isLoading: true,
            };
        })

        builder.addCase(convert_doc.fulfilled, state => {
            return {
                ...state,
                isLoading: false,
                conversion_status:"sucess"
            };
        })

        builder.addCase(convert_doc.rejected, state => {
            return {
                ...state,
                isLoading: false,
                conversion_status:"failed"
            };
        })
    }
})

export default convert_doc_slice.reducer;

