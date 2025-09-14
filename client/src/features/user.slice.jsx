import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import {
  ADD_MENU_ROUTE,
  ASSIGN_ORDER_TO_ROUTE,
  CHANGE_ORDER_STATUS_ROUTE,
  DRIVER_ORDERS_ROUTE,
  FETCH_ALL_MENU_ROUTE,
  FETCH_DRIVERS_ROUTE,
  GET_USER_INFO_ROUTE,
  HOST,
  LOGIN_ROUTE,
  ORDER_LIST_ROURE,
  ORDER_ROUTE,
  PLACE_ORDER_ROURE,
  SIGNUP_ROUTE,
  UPDATE_MENU_ROUTE,
} from "@/utils/constant";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: "",
  },

  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
    prepareHeaders: (headers, { getState }) => {
      // 1. Get token from localStorage (or Redux store if you saved it there)
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addMenu: builder.mutation({
      query: (formData) => ({
        url: ADD_MENU_ROUTE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Menu"],
    }),

    userSignUp: builder.mutation({
      query: (data) => ({
        url: SIGNUP_ROUTE,
        method: "POST",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: LOGIN_ROUTE,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Users"]
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: GET_USER_INFO_ROUTE,
        method: "GET",
      }),
    }),

    fetchMenus: builder.query({
      query: () => ({
        url: FETCH_ALL_MENU_ROUTE,
        method: "GET",
      }),
      providesTags: ["Menu"],
    }),
      updateMenu: builder.mutation({
        query: ({ id, formData }) => ({
          url: `${UPDATE_MENU_ROUTE}/${id}`,
          method: "PUT",
          body: formData,
        }),
        invalidatesTags:["Menu"]
      }),

       placeOrder: builder.mutation({
      query: (formData) => ({
        url: PLACE_ORDER_ROURE,
        method: "POST",
        body:formData
      }),
      invalidatesTags: ["Order"],
    }),
     orderList: builder.query({
      query: () => ({
        url: ORDER_LIST_ROURE,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

     // simple mutation (recommended)
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: CHANGE_ORDER_STATUS_ROUTE,
        method: "PUT",
        body: {orderId, status },
      }),
      invalidatesTags: ["Order"], 
    }),
    fetchDrivers: builder.query({
      query: () => ({
        url: FETCH_DRIVERS_ROUTE,
        method: "GET",
      }),
      providesTags: ["Users"], 
    }),
      // simple mutation (recommended)
    assignTo: builder.mutation({
      query: ({ orderId, driverId }) => ({
        url: ASSIGN_ORDER_TO_ROUTE,
        method: "POST",
        body: {orderId, driverId },
      }),
      invalidatesTags: ["Order"], 
    }),

      orderAssignedToDriver: builder.query({
      query: () => ({
        url: DRIVER_ORDERS_ROUTE,
        method: "GET",
      }),
      providesTags: ["Order"] 
    }),
    

  }),
});

export const {
  useAddMenuMutation,
  useUserLoginMutation,
  useUserSignUpMutation,
  useGetUserInfoQuery,
  useFetchMenusQuery,
  useUpdateMenuMutation,
  usePlaceOrderMutation,
  useOrderListQuery,
  useUpdateOrderStatusMutation,
  useFetchDriversQuery,
  useAssignToMutation,
  useOrderAssignedToDriverQuery
} = userApi;
export const userReducer = userSlice.reducer;
export const { setUserInfo } = userSlice.actions;
