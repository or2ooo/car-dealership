import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './rootReducer';
import { userApi } from 'services/userApi';
import { carApi } from 'services/carApi';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(carApi.middleware),
});

// Setup listeners for refetching queries on certain actions if needed
setupListeners(store.dispatch);

// Remember to export the types for RootState and AppDispatch if you haven't already
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
