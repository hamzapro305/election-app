import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "CandidateForm",
    initialState: {
        name: "",
        seatNo: "",
        image: undefined,
        description: "",
    },
    reducers: {
        setValue: (state, { payload }) => {
            state[payload.name] = payload.value;
        },
        setImage: (state, { payload }) => {
            state.image = payload;
        }
    },
});

export const CandidateFormActions = Slice.actions;

export default Slice.reducer;
