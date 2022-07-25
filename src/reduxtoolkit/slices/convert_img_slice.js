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

export const convert_img = createAsyncThunk('convert/img', (payload, { dispatch, getState, rejectWithValue }) => {
  
   if(payload.url === null) delete payload.url;
   if(payload.raw_data === null) delete payload.raw_data;
   if(payload.file === null) delete payload.file;
    return axios
        .post(`${process.env.REACT_APP_BASEURL}/img/convert`, payload,{
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


const convert_img_slice = createSlice({
    name: "convert",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(convert_img.pending, state => {
            return {
                ...state,
                isLoading: true,
            };
        })

        builder.addCase(convert_img.fulfilled, state => {
            return {
                ...state,
                isLoading: false,
                conversion_status:"sucess"
            };
        })

        builder.addCase(convert_img.rejected, state => {
            return {
                ...state,
                isLoading: false,
                conversion_status:"failed"
            };
        })
    }
})

export default convert_img_slice.reducer;

