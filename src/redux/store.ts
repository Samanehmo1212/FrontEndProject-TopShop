import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import productReducer from './reducers/productReducers';
import cartReducer from './reducers/cartReducers';
import userReducer from './reducers/userReducers';

export const createStore=()=>{
  return configureStore({
    reducer: {
      productReducer,
      cartReducer,
      userReducer
    },
  });
} 

const store=createStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
