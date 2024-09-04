import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:"theme",
    initialState:{isThemeDark:false},
    reducers:{
        toggleTheme:(state) => {
            state.isThemeDark  = !state.isThemeDark;
        }
    }
})

export default themeSlice.reducer;

export const {toggleTheme} = themeSlice.actions;