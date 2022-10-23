import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "CurrentAuth",
    initialState: {
        User: false,
        isMaleVoteSubmitted: false,
        isFemaleVoteSubmitted: false,
        isEmailSubmitted: null,
    },
    reducers: {
        setIsEmailSubmitted: (state, { payload }) => {
            state.isEmailSubmitted = payload;
        },
        setUserAction: (state, { payload }) => {
            state.User = payload;
        },
        setIsMaleVoteSubmitted: (state, { payload }) => {
            state.isMaleVoteSubmitted = payload;
        },
        setIsFemaleVoteSubmitted: (state, { payload }) => {
            state.isFemaleVoteSubmitted = payload;
        },
    },
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
