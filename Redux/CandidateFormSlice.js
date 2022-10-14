import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "CandidateForm",
    initialState: {
        name: "",
        seatNo: "",
        image: undefined,
        description: "",
        status: "pending",
        gender: "",
    },
    reducers: {
        setValue: (state, { payload }) => {
            state[payload.name] = payload.value;
        },
        setForm: (state, { payload }) => {
            state.name = payload.name;
            state.seatNo = payload.seatNo;
            state.image = payload.image;
            state.description = payload.description;
            state.gender = payload.gender;
        },
        setImage: (state, { payload }) => {
            state.image = payload;
        },
    },
});

export const CandidateFormActions = Slice.actions;

export default Slice.reducer;
