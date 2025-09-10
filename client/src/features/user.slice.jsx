import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import { ADD_MENU_ROUTE, HOST } from "@/utils/constant";





export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
  }),
  endpoints: (builder) => ({
    addMenu:builder.mutation({
      query: (formData) => ({
        url: ADD_MENU_ROUTE,
        method: "POST",
        body: formData,
      })
    })


})
});

export const {
    useAddMenuMutation
} = userApi;


