import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "Votes",
    initialState: {
        AllVotes: [],
    },
    reducers: {
        setVotes: (state, { payload }) => {
            state.AllVotes = payload;
        },
    },
});

export const VotesActions = Slice.actions;

export default Slice.reducer;
