import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:"profile",
    initialState:{
        user:null,
        education:[],
        skills:[],
        experience:[],
        profilePic:null,
        coverPic:null,
        followers:0
    },
    reducers:{
        changeUserDetails: (state,action) => {
            state.user = action.payload
        },
        addEducationAction: (state, action) => {
            state.education = action.payload
        },
        updateEducationAction: (state, action) => {
            state.education.push(action.payload)
        },
        addSkillsAction: (state, action) => {
            state.skills = action.payload;
        },
        updateSkillsAction: (state, action) => {
            state.skills.push(action.payload)
        },

        addExperienceAction: (state, action) => {
            console.log("incomingExperience :::", action.payload)
            state.experience = action.payload
        },
        updateExperienceAction: (state, action) => {
            state.experience.push(action.payload)
            console.log("exp after manual insertion :::", state.experience)
        },

        updateProfilePic: (state, action) => {
            state.profilePic = action.payload
        },
        updateCoverPic: (state, action) => {
            state.coverPic = action.payload
        },
        setFollowers: (state, action) => {
            state.followers = action.payload
        }
    }
})

export const {
    changeUserDetails,
    addEducationAction,
    updateEducationAction,
    addSkillsAction,
    updateSkillsAction,
    addExperienceAction,
    updateExperienceAction,
    updateProfilePic,
    updateCoverPic,
    setFollowers
} = profileSlice.actions;

export default profileSlice.reducer;