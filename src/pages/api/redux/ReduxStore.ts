import { configureStore } from "@reduxjs/toolkit";
import { reduceM } from "./ReduxToolkit";


export const store = configureStore({
  reducer: {
    mainR: reduceM,
  },
});


export type RootState = ReturnType<typeof store.getState>;
