import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const NativeSlice = createSlice({
    name:"native",
    initialState,
    reducers:{
        login : (state,action)=>{

        }
    }
})
export const {login} = NativeSlice.actions
export default NativeSlice.reducer;