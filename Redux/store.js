import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import GlobalVariableSlice from "./GlobalVariableSlice";
import UserSlice from "./UserSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      GlobalVariables: GlobalVariableSlice,
      CurrentAuth: UserSlice,
    },
    middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false })
  });

export const Wrapper = createWrapper(makeStore);
