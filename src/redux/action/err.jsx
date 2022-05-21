export const clear_err =(payload)=>({
    type: "CLEAR_ERROR"
})


export const get_err =(msg,status, id)=>({
    type: "GET_ERROR",
    payload: { msg, status, id}
})