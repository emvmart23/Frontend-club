import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authSlice } from './slices/auth';
import { roleSlice } from './slices/role';
import { categorySlice } from './slices/category';
import { unitSlice } from './slices/unit';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        roles: roleSlice.reducer,
        categories: categorySlice.reducer,
        units: unitSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch