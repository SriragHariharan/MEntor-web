import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        username: JSON.parse(localStorage.getItem("MEntor_username")) ?? null,
        token: JSON.parse(localStorage.getItem("MEntor_token")) ?? null,
        email:JSON.parse(localStorage.getItem("MEntor_email")) ?? null,
        profilePicture:JSON.parse(localStorage.getItem("MEntor_token")) ?? null,
        role:JSON.parse(localStorage.getItem("MEntor_role")) ?? null
    },
    reducers:{
        loginUserAction: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.profilePicture = action.payload.profilePicture;
            localStorage.setItem("MEntor_token", JSON.stringify(action.payload.token));
            localStorage.setItem("MEntor_username", JSON.stringify(action.payload.username));
            localStorage.setItem("MEntor_email", JSON.stringify(action.payload.email));
            localStorage.setItem("MEntor_profile_pic", JSON.stringify(action.payload.profilePicture));
            localStorage.setItem("MEntor_role", JSON.stringify(action.payload.role));            
        },
        logoutUserAction: (state) => {
            localStorage.clear();
            state.username = null;
            state.token = null;
            state.email = null;
            state.role = null;
        }
    }
})

export const { loginUserAction, logoutUserAction} = userSlice.actions;
export default userSlice.reducer;