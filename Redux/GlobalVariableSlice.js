import { createSlice } from "@reduxjs/toolkit";

const GlobalVariableSlice = createSlice({
    name: "GlobalVariables",
    initialState: {
        header: true,
        footer: true,
        HamSideBar: false,
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
    },
});

export const { setHeader, setFooter, setHamSideBar } =
  GlobalVariableSlice.actions;
export default GlobalVariableSlice.reducer;
