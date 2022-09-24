import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import CandidateFormSlice from "./CandidateFormSlice";
import GlobalVariableSlice from "./GlobalVariableSlice";
import UserSlice from "./UserSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            GlobalVariables: GlobalVariableSlice,
            CurrentAuth: UserSlice,
            CandidateForm: CandidateFormSlice,
        },
        middleware: (defaultMiddleware) =>
            defaultMiddleware({ serializableCheck: false }),
    });

export const Wrapper = createWrapper(makeStore);
