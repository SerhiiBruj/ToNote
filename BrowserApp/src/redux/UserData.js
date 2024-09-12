import { createSlice } from "@reduxjs/toolkit";

export const userData = createSlice({
    name: "userData",
    initialState: {
        hasUserData: false,
        userName: "",
        email:'',
        imageUrl:"",
    },
    reducers: {
        doHaveData: state => {
            state.hasUserData = true;
        },
        setUserData: (state, action) => {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.imageUrl = action.payload.imageUrl;
          }
    },
})
export const { doHaveData, setUserData } = userData.actions
export default userData.reducer