
export const HOST = import.meta.env.VITE_SERVER_URL

export const MENU_ROUTE = "/api/menu"; 
export const ORDER_ROUTE = "/api/order";
export const AUTH_ROUTE = "/api/auth";

export const ADD_MENU_ROUTE =`${MENU_ROUTE}/create-menu`;
export const FETCH_ALL_MENU_ROUTE =`${MENU_ROUTE}/fetch-all-menu`;
export const UPDATE_MENU_ROUTE = `${MENU_ROUTE}/update-menu`;
export const DELETE_MENU_ROUTE = `${MENU_ROUTE}/delete-menu`;
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO_ROUTE = `${AUTH_ROUTE}/get-user-info`;
export const PLACE_ORDER_ROURE = `${ORDER_ROUTE}/place-order`;
export const ORDER_LIST_ROURE = `${ORDER_ROUTE}/allorders`;
export const CHANGE_ORDER_STATUS_ROUTE=`${ORDER_ROUTE}/change-order-status`;
export const FETCH_DRIVERS_ROUTE =`${AUTH_ROUTE}/drivers`;
export const ASSIGN_ORDER_TO_ROUTE=`${ORDER_ROUTE}/order-assign-driver`