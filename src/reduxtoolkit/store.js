import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth_slice';
import error from './slices/err_slice';
import history from './slices/history_slice';
import upload_doc from './slices/upload_doc_slices';
import upload_img from './slices/upload_img_slices';
import convert_doc from './slices/convert_doc_slices';
import convert_img from './slices/convert_img_slice';

const store = configureStore({
    reducer: {
        auth,
        error,
        history,
        upload_doc,
        upload_img,
        convert_doc,
        convert_img
    }

})

export default store