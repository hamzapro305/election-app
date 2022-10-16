import { createSlice } from "@reduxjs/toolkit";

const GlobalVariableSlice = createSlice({
    name: "GlobalVariables",
    initialState: {
        header: true,
        footer: true,
        HamSideBar: false,
        realTime: {
            canApply: null,
            canVote: null,
        },
    },
    reducers: {
        setHeader: (state, { payload }) => {
            state.header = payload;
        },
        setFooter: (state, { payload }) => {
            state.footer = payload;
        },
        setHamSideBar: (state, { payload }) => {
            state.HamSideBar = payload;
        },
        setRealTime: (state, { payload }) => {
            state.realTime = payload;
        },
    },
});

export const GlobalVariableActions = GlobalVariableSlice.actions;
export default GlobalVariableSlice.reducer;
