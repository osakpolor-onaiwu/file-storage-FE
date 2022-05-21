const initialState = {
    msg:{},
    status:null
}

const error =(state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_ERROR':
            return {
                msg:{},
                status: null,
                id: null
            }
        case "GET_ERROR":
            return {
                ...state,
                msg:action.payload.msg,
                status:action.payload.status,
                id:action.payload.id
            }
        default:
            return state
    }
}

export default error;