import {combineReducers} from 'redux';
import error_reducer from './err';
// import auth from './auth';
// import upload from './upload';
// import download from './download';
//import other reducers here

export default combineReducers({
    error: error_reducer

})