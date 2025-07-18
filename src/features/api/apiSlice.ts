import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "http://localhost:8000/api";

export const apiSlice = createApi({
	reducerPath: "api",
	tagTypes: ["Categories", "CastMembers"],
	endpoints: () => ({}),
	baseQuery: fetchBaseQuery({ baseUrl }),
});
