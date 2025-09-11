import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import {
  ADD_MENU_ROUTE,
  FETCH_ALL_MENU_ROUTE,
  GET_USER_INFO_ROUTE,
  HOST,
  LOGIN_ROUTE,
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
  }),
});

export const {
  useAddMenuMutation,
  useUserLoginMutation,
  useUserSignUpMutation,
  useGetUserInfoQuery,
  useFetchMenusQuery,
  useUpdateMenuMutation
} = userApi;
export const userReducer = userSlice.reducer;
export const { setUserInfo } = userSlice.actions;
