import { createSlice} from '@reduxjs/toolkit';
const initialState = {
    msg:{},
    status:null,
    id:null,
}

const err_slice = createSlice({
    name:'err',
    initialState,
    reducers:{
        clear_error:(state)=>{
            return { 
                msg:{},
                status:null,
                id:null,
            }
        },
        get_error:(state,action)=>{
            return { 
                ...state,
                msg:action.payload.msg,
                status:action.payload.status,
                id:action.payload.id
            }
        }
    }
})

export default  err_slice.reducer;
export const {clear_error, get_error} = err_slice.actions