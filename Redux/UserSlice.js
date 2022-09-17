import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "CurrentAuth",
    initialState: {
        User: false,
    },
    reducers:{
        setUserAction: (state, { payload }) => {
            state.User = payload
        }
    }
})

export const { setUserAction } = UserSlice.actions;
export default UserSlice.reducer