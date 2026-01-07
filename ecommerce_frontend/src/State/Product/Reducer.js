import { deleteProduct } from "./Action"
import { DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, GET_PRODUCTSBYFILTER_FAILURE, GET_PRODUCTSBYFILTER_REQUEST, GET_PRODUCTSBYFILTER_SUCCESS, LOAD_PRODUCTS_BY_CATEGORY_FAILURE, LOAD_PRODUCTS_BY_CATEGORY_REQUEST, LOAD_PRODUCTS_BY_CATEGORY_SUCCESS } from "./ActionTyps"
import { GET_CATEGORIES_FAILURE, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS } from "./ActionTyps"

const initialState = {
    productsByCategory: {},
    products:[],
    category:[],
    productsByFilter:[],
    product:null,
    totalPages:0,
    loading:false,
    error:null,
}

export const customerProductReducer = (state=initialState,action) => {
    switch(action.type){
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case GET_PRODUCTSBYFILTER_REQUEST:
        case LOAD_PRODUCTS_BY_CATEGORY_REQUEST:
            return {...state,loading:true,error:null}

        case LOAD_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {...state,loading: false,error: null,productsByCategory: {...state.productsByCategory,[action.payload.category]: action.payload.products}};
        
        case GET_PRODUCTSBYFILTER_SUCCESS:
            return {...state,loading:false,error:null,productsByFilter:action.payload.products,totalPages:action.payload.totalPages};
        case FIND_PRODUCTS_SUCCESS:
            return {...state,loading:false,error:null,products:action.payload}
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {...state,loading:false,error:null,product:action.payload}
        case DELETE_PRODUCT_SUCCESS:
            return {...state,loading:false,error:null,deleteProduct:action.payload}
        
        case FIND_PRODUCT_BY_ID_FAILURE:
        case FIND_PRODUCTS_FAILURE:
        case LOAD_PRODUCTS_BY_CATEGORY_FAILURE:
        case GET_PRODUCTSBYFILTER_FAILURE:
            return {...state,loading:false,error:action.payload};
        
        case GET_CATEGORIES_REQUEST:
            return {...state,loading:true,error:null};
        case GET_CATEGORIES_SUCCESS:
            return {...state,loading:false,error:null,category:action.payload};
        case GET_CATEGORIES_FAILURE:
            return {...state,loading:false,error:action.payload};
        default:
            return state;
    }
}