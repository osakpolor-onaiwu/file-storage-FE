import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { config_json } from '../headers';
import tokenConfig from '../token_config';
const initialState = {
    data_uploaded:'',
    percentage_completed: 0,
    isLoading: false,
    upload_status:null,
    download_link: null,
}

export const upload_img = createAsyncThunk('upload/img', (payload, { dispatch, getState, rejectWithValue }) => {
  
   if(payload.url === null) delete payload.url;
   if(payload.raw_data === null) delete payload.raw_data;
   if(payload.file === null) delete payload.file;
    return axios
        .post(`${process.env.REACT_APP_BASEURL}/img/upload`, payload,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
            },
            // onUploadProgress: (p) =>{
            //     const percentage_completed = Math.round((p.loaded * 100) / p.total);
            //     initialState({
            //         data_uploaded:payload,
            //         percentage_completed:percentage_completed
            //     })
            // }
        })
        .then(res => {}).catch(e => {
            return rejectWithValue(e.response.data)
        })
})


const uploads_img_slice = createSlice({
    name: "upload",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(upload_img.pending, state => {
            return {
                ...state,
                isLoading: true,
            };
        })

        builder.addCase(upload_img.fulfilled, state => {
            return {
                ...state,
                isLoading: false,
                upload_status:"success"
            };
        })

        builder.addCase(upload_img.rejected, state => {
            return {
                ...state,
                isLoading: false,
                upload_status:"failed"
            };
        })
    }
})

export default uploads_img_slice.reducer;

