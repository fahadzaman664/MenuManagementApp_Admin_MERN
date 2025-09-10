
export const HOST = import.meta.env.VITE_SERVER_URL

export const MENU_ROUTE = "/api/menu"; 
export const ORDER_ROUTE = "/api/order";

export const ADD_MENU_ROUTE =`${MENU_ROUTE}/create-menu`;
export const FETCH_ALL_MENU_ROUTE =`${MENU_ROUTE}/fetch-all-menu`;
export const UPDATE_MENU_ROUTE = `${MENU_ROUTE}/update-menu`;
export const DELETE_MENU_ROUTE = `${MENU_ROUTE}/delete-menu`;