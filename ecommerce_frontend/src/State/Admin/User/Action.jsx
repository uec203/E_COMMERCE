import { api } from "../../../config/apiConfig"
import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, DELETE_USERS_FAILURE,DELETE_USERS_REQUEST, DELETE_USERS_SUCCESS} from "./ActionType";

export const getUsers = () => async (dispatch) =>{
    dispatch({ type:GET_USERS_REQUEST })
    try {
            const { data } = await api.get(`api/admin/users/all`);
            console.log("Fetched users data:", data);
    
            dispatch({ type:GET_USERS_SUCCESS , payload: data });
        } catch (error) {
            dispatch({ type: GET_USERS_FAILURE, payload: error.message });
        }
    } 

export const deleteCustomer = (customerId) => async (dispatch) =>{
    dispatch({ type:DELETE_USERS_REQUEST }) 
    try {
            const { data } = await api.delete(`api/admin/users/${customerId}/delete`);
    
            dispatch({ type:DELETE_USERS_SUCCESS , payload: customerId });
        } catch (error) {
            dispatch({ type: DELETE_USERS_FAILURE, payload: error.message });
        }      
}