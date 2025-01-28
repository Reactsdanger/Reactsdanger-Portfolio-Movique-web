import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const saveToLocalStorage = (state: string | boolean) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined; 
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const initialState = {
  Theme: false,
  searchQuery: '',
};

export const MainReducer = createSlice({
  name: "main",
  initialState,
  reducers: {
    HandleClick: (state) => {
      state.Theme = !state.Theme;
    },
    SearchRes: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;  
    },
  },
});

export const {HandleClick, SearchRes} = MainReducer.actions
export const reduceM = MainReducer.reducer