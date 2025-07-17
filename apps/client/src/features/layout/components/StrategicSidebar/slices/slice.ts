import { AppStateTypeSSR } from "@/core/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState = {
  isSide: false,
  currentCourseID: "",
};

export const strategicSlice = createSlice({
  name: "strategicSide",
  initialState: initState,
  reducers: {
    setSide: (state, action: PayloadAction<boolean>) => {
      state.isSide = action.payload;
    },
    setCurrCourseID: (state, action: PayloadAction<string>) => {
      state.currentCourseID = action.payload;
    },
  },
});

export const getStrategicSliceState = (state: AppStateTypeSSR) =>
  state.strategicSide;
