import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "CurrentAuth",
    initialState: {
        User: false,
        isVoteSubmitted: false,
    },
    reducers: {
        setUserAction: (state, { payload }) => {
            state.User = payload;
        },
        setIsVoteSubmitted: (state, { payload }) => {
            state.isVoteSubmitted = payload;
        },
    },
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
