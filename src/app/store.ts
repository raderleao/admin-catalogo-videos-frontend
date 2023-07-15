import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categories, { categoriesApiSlice } from '../features/categories/CategorySlice';
import { apiSlice } from '../features/api/apiSlice';
export const store = configureStore({
  reducer: {
    categories: categories,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, categoriesApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
