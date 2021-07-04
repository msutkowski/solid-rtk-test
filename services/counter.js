import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/"
  }),
  tagTypes: ["Counter"],
  endpoints: (build) => ({
    getCount: build.query({
      query: () => ({
        url: `count`
      }),
      providesTags: ["Counter"]
    }),
    incrementCount: build.mutation({
      query: (amount) => ({
        url: `increment`,
        method: "PUT",
        body: { amount }
      }),
      invalidatesTags: ["Counter"]
    }),
    decrementCount: build.mutation({
      query: (amount) => ({
        url: `decrement`,
        method: "PUT",
        body: { amount }
      }),
      invalidatesTags: ["Counter"]
    }),
    getCountById: build.query({
      query: (id) => `${id}`,
      providesTags: (_, id) => [{ type: "Counter", id }]
    }),
    incrementCountById: build.mutation({
      query: ({ id, amount }) => ({
        url: `${id}/increment`,
        method: "PUT",
        body: { amount }
      }),
      invalidatesTags: (_, { id }) => [{ type: "Counter", id }]
    }),
    decrementCountById: build.mutation({
      query: ({ id, amount }) => ({
        url: `${id}/decrement`,
        method: "PUT",
        body: { amount }
      }),
      invalidatesTags: (_, { id }) => [{ type: "Counter", id }]
    }),
    stop: build.mutation({
      query: () => ({
        url: "stop",
        method: "PUT"
      })
    })
  })
});
