import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "Votes",
    initialState: {
        AllVotes: [],
        RequiredEmails: [
            // "hamzapro285@gmail.com",
            "hammadarrain9@gmail.com",
            "umerq0875@gmail.com",
            "rehmanwasif69@gmail.com",
            "yousuf.sa33d@gmail.com",
            "hassanmuntazir151@gmail.com",
            "salmanusama894@gmail.com",
            "qaimhassan125@gmail.com",
            "sadaqatziaa@gmail.com ",
            "saherhussain00@gmail.com",
            "sherazasgher37@gmail.com",
            "jurryabbas2002@gmail.com",
            "mfakhir866@gmail.com",
            "nh944314@gmail.com",
            "shameersyed262@gmail.com",
            "saimyahya47@gmail.com",
            "syedyaseenarham@gmail.com",
            "zainnemat01@gmail.com",
            "tooba0800@gmail.com",
            "goldkutch@gmail.com",
            "usamaayaz421@gmail.com",
        ],
    },
    reducers: {
        setVotes: (state, { payload }) => {
            state.AllVotes = payload;
        },
    },
});

export const VotesActions = Slice.actions;

export default Slice.reducer;
