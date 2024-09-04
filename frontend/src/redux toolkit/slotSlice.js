import { createSlice } from "@reduxjs/toolkit";

const slotSlice = createSlice({
    name:"slots",
    initialState:{
        selectedSlots:[]
    },
    reducers:{
        addSlots: (state,action) =>{
            state.selectedSlots = action.payload;
        },
        addNewSlot: (state,action) =>{
            state.selectedSlots.push(action.payload);
        },
        deleteSlot: (state,action) =>{
            let filteredSlots = state.selectedSlots.filter(sl => sl._id !== action.payload);
            state.selectedSlots = filteredSlots;
        },
    }
})

export const {
    addSlots,
    addNewSlot,
    deleteSlot
} = slotSlice.actions;

export default slotSlice.reducer;
