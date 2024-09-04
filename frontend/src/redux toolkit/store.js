import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";
import profileSlice from "./profileSlice";
import slotSlice from "./slotSlice";

export const store = configureStore({
	reducer: {
        isDark: themeSlice,
        user: userSlice,
        profile: profileSlice,
        slots: slotSlice
    },
});
