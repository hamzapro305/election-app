import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "Candidate",
    initialState: {
        Candidates: null,
    },
    reducers: {
        setCandidates: (state, { payload }) => {
            state.Candidates = payload;
        },
    },
});

export const CandidateActions = Slice.actions;

export default Slice.reducer;
