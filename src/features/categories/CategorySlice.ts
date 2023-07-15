import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

}

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Results, void>({
            query: () => "/categories",
            providesTags: ["Categories"],
        }),
    }),
});

const categoriesSlice = createSlice({
    name: "categories",
    initialState: [] as Category[],
    reducers: {
        createCategory(state, action) {
            state.push(action.payload);
        },
        updateCategory(state, action) {
            const { id } = action.payload;
            const existingCategory = state.find((category) => category.id === id);
            if (existingCategory) {
                Object.assign(existingCategory, action.payload);
            }
        },
        deleteCategory(state, action) {
            const { id } = action.payload;
            const index = state.findIndex((category) => category.id === id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(categoriesApiSlice.endpoints.getCategories.matchFulfilled, (state, action) => {
            action.payload.data && state.push(...action.payload.data);
        });
    },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;

// Select category by id
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
            deleted_at: "",

        }
    );
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export const { useGetCategoriesQuery } = categoriesApiSlice;
