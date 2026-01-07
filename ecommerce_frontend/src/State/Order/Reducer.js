import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS } from "./ActionType";
import { GET_ORDERS_BY_USER_FAILURE, GET_ORDERS_BY_USER_REQUEST, GET_ORDERS_BY_USER_SUCCESS } from "./ActionType";

const initialState={
    orders:[],
    order:null,
    error:null,
    loading:false
}

export const orderReducer = (state=initialState,action) => {
    switch(action.type){
        case GET_ORDER_BY_ID_REQUEST:
        case CREATE_ORDER_REQUEST:
        return {...state,loading:true ,error :null };

        case CREATE_ORDER_SUCCESS:
            return {...state,loading:false,order:action.payload};

        case GET_ORDER_BY_ID_SUCCESS:
            return {...state,loading:false,order : action.payload}

        case GET_ORDER_BY_ID_FAILURE:
        case CREATE_ORDER_FAILURE:
        return {...state,loading:false,error:action.payload};
        case GET_ORDERS_BY_USER_REQUEST:
            return {...state,loading:true ,error :null };
        case GET_ORDERS_BY_USER_SUCCESS:
            return {...state,loading:false,orders : action.payload}
        case GET_ORDERS_BY_USER_FAILURE:
            return {...state,loading:false,error:action.payload};
        default:
            return state;
    }
}