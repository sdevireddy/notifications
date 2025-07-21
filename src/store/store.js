
import { configureStore } from '@reduxjs/toolkit'
import orgReducer from './orgSlice'
import userReducer from "./userSlice"
export const store = configureStore({
  reducer: {
    organization:orgReducer,
    user:userReducer
  },
  devTools:true,
})

