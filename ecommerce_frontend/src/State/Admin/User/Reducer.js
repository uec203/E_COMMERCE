import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    DELETE_USERS_REQUEST,
    DELETE_USERS_SUCCESS,
    DELETE_USERS_FAILURE
} from "./ActionType";


const initialState = {
    users:[],
    deleteUser:null,
    loading:false,
    error:"",
};

const adminUserReducer = (state = initialState,action) => {
    switch(action.type){
        case GET_USERS_REQUEST:
            return {...state,loading:true};
        case GET_USERS_SUCCESS:
            return {loading:false,users:action.payload,error:""};
        case GET_USERS_FAILURE:
            return {loading:false,users:[],error: action.payload};
        case DELETE_USERS_REQUEST:
            return {...state,loading:true};
        case DELETE_USERS_SUCCESS:
            return {...state,loading:false,deleteUser:action.payload};
        case DELETE_USERS_FAILURE:
            return {...state,error:action.payload,loading:false};
        default:
            return state;
    }
};

export default adminUserReducer;