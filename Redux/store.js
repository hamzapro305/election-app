import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import CandidateFormSlice from "./CandidateFormSlice";
import CandidateSlice from "./CandidateSlice";
import GlobalVariableSlice from "./GlobalVariableSlice";
import UserSlice from "./UserSlice";
import VotesSlice from "./VotesSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            GlobalVariables: GlobalVariableSlice,
            CurrentAuth: UserSlice,
            CandidateForm: CandidateFormSlice,
            Candidate: CandidateSlice,
            Votes: VotesSlice,
        },
        middleware: (defaultMiddleware) =>
            defaultMiddleware({ serializableCheck: false }),
    });

export const Wrapper = createWrapper(makeStore);
