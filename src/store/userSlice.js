import { createSlice } from "@reduxjs/toolkit";
const initialValue={
    profile:"https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png",
    name:"Praveen",
    email:null
}


const userSlice=createSlice({
    name:"user",
    initialState:initialValue,
    reducers:{
        setUserState: (state, action) => {
      return { ...state, ...action.payload };
    },
    }
})

export const {setUserState}=userSlice.actions
export default userSlice.reducer
