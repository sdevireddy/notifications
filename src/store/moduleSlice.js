import { createSlice } from "@reduxjs/toolkit";
const initialValue={
   CRM:true,
   HR:true,
   Books:false,
   Marketing:true,
   Campaigns:false,
   TiketDesk:false
}


const moduleSlice=createSlice({
    name:"modules",
    initialState:initialValue,
    reducers:{
        setModuleState: (state, action) => {
      return { ...state, ...action.payload };
    },
    }
})

export const {setModuleState}=moduleSlice.actions
export default moduleSlice.reducer
