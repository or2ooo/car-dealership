import { combineReducers } from '@reduxjs/toolkit';
import userReducer from 'state/slices/userSlice';
import { userApi } from 'api/queries/userApi';
import { carApi } from 'api/queries/carApi';

const rootReducer = combineReducers({
    // Your other reducers here
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
});

export default rootReducer;
