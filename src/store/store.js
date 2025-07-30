
import { configureStore } from '@reduxjs/toolkit'
import orgReducer from './orgSlice'
import userReducer from "./userSlice"
import moduleReducer from "./moduleSlice"
export const store = configureStore({
  reducer: {
    organization:orgReducer,
    user:userReducer,
    module:moduleReducer,
  },
  devTools:true,
})

