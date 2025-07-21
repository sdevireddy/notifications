import { createSlice } from "@reduxjs/toolkit";
const initialValue={
    logo:"https://sdmntpreastus.oaiusercontent.com/files/00000000-7328-61f9-adfd-474d1371df47/raw?se=2025-07-21T06%3A50%3A06Z&sp=r&sv=2024-08-04&sr=b&scid=728e66f0-9f8d-5b71-9604-a0c9977bb5ed&skoid=31bc9c1a-c7e0-460a-8671-bf4a3c419305&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-21T04%3A44%3A43Z&ske=2025-07-22T04%3A44%3A43Z&sks=b&skv=2024-08-04&sig=CPZCtOGH3U09MgbsI6/gKTbHBmN5LPEzbnKeN2pq%2BAM%3D",
    image:null,
    name:"ipixelzen",
    email:null
}


const orgSlice=createSlice({
    name:"orginazation",
    initialState:initialValue,
    reducers:{
        setOrgState: (state, action) => {
      return { ...state, ...action.payload };
    },
    }
})

export const {setOrgState}=orgSlice.actions
export default orgSlice.reducer
