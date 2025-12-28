import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, LOAD_PRODUCTS_BY_CATEGORY_FAILURE, LOAD_PRODUCTS_BY_CATEGORY_REQUEST, LOAD_PRODUCTS_BY_CATEGORY_SUCCESS } from "./ActionTyps";
import { api,API_BASE_URL} from "../../config/apiConfig";
import { GET_CATEGORIES_FAILURE, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS } from "./ActionTyps";

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({type:FIND_PRODUCTS_REQUEST})
    try {
        const { data } = await api.get(`/public/api/allproducts`);
        console.log("Fetched products data:", data);

        dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:FIND_PRODUCTS_FAILURE,payload:error.message});
    }
} 

export const loadProductsByCategory = (category) => async (dispatch) => {
    dispatch({type:LOAD_PRODUCTS_BY_CATEGORY_REQUEST})
    
    try {
        const {data} = await api.get(`/public/api/category/${category}`);

        dispatch({type:LOAD_PRODUCTS_BY_CATEGORY_SUCCESS,payload: {category,products: data}});
    } catch (error) {
        dispatch({type:LOAD_PRODUCTS_BY_CATEGORY_FAILURE,payload:error.message});
    }
} 

export const findProductsById = (productId) => async (dispatch) => {
    dispatch({type:FIND_PRODUCT_BY_ID_FAILURE})
    try {
        const {data} = await api.get(`public/api/products/id/${productId}`);
        console.log("Fetched product by ID data:", data);

        dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message});
    }
} 

export const createProduct = (product) => async (dispatch) => {
    dispatch({type:CREATE_PRODUCT_REQUEST})
    try {
        const {data} = await api.post(`api/admin/products/creates`,product,);

        dispatch({type:CREATE_PRODUCT_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:CREATE_PRODUCT_FAILURE,payload:error.message});
    }

}

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({type:DELETE_PRODUCT_REQUEST})
    try {
        const {data} = await api.delete(`api/admin/products/${productId}/delete`,productId);

        dispatch({type:DELETE_PRODUCT_SUCCESS,payload:productId});
    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAILURE,payload:error.message});
    }

}

export const getCategories = () => async (dispatch) => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    try {
        const { data } = await api.get(`public/api/products/categories`);
        console.log("Fetched categories data:", data);  
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CATEGORIES_FAILURE, payload: error.message });
    }   
}