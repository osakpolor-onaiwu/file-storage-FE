import {config_json} from './headers'

const tokenConfig = (getState) =>{
    const  token = getState().auth.token;

    if(token){
        config_json.headers['Authorization'] = `Bearer ${token}`;
        return config_json;
    }
}

export default tokenConfig;