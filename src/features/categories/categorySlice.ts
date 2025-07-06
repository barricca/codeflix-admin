import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {CategoryParams, Result, Results} from "../../types/Category";
import {apiSlice} from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function getCategories({page = 1, perPage = 10, search = ""}) {
  const params = {page, perPage, search, isActive: true};

  return {
    url: `${endpointUrl}?${parseQueryParams(params)}`,
    method: "GET",
  };
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

function createCategoryMutation(category: Category) {
  return {
    url: endpointUrl,
    method: "POST",
    body: category,
  };
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

function getCategory({id}: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "GET",
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategory,
      providesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

const category: Category = {
  id: "2e9fddb8-e4ee-429a-99ad-b5c8630d76c0",
  name: "IndianRed",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  is_active: true,
  deleted_at: null,
  created_at: "2024-10-18T02:46:45+0000",
  updated_at: "2024-10-18T02:46:45+0000",
};

export const initialState = [
  category,
  {
    ...category,
    id: "2e9fddb8-e4ee-429a-99ad-b5c8630d76c1",
    name: "Crimson",
    is_active: false,
  },
  {
    ...category,
    id: "2e9fddb8-e4ee-429a-99ad-b5c8630d76c2",
    name: "LightCoral",
  },
  {
    ...category,
    id: "2e9fddb8-e4ee-429a-99ad-b5c8630d76c3",
    name: "DarkRed",
  },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      // find index on state of category to update
      const index = state.findIndex(
          (category) => category.id === action.payload.id
      );
      // update category on state
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      // find index on state of category to delete
      const index = state.findIndex(
          (category) => category.id === action.payload.id
      );
      // remove category from state
      state.splice(index, 1);
    },
  },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;

// Select catepory by id
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);

  return (
      category || {
        id: "",
        name: "",
        description: "",
        is_active: false,
        created_at: "",
        updated_at: "",
        deleted_at: null,
      }
  );
};

export default categoriesSlice.reducer;
export const {createCategory, updateCategory, deleteCategory} =
    categoriesSlice.actions;

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesApiSlice;
