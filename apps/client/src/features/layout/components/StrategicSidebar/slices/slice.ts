"use client";
import { AppStateTypeSSR } from "@/core/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcIsAlwaysOpen } from "../StrategicSidebar";

const initState = {
  isSide: calcIsAlwaysOpen(),
  swapState: "swapped",
  currentCourseID: "",
  currentConceptID: "",
};

export const strategicSlice = createSlice({
  name: "strategicSide",
  initialState: initState,
  reducers: {
    setSide: (state, action: PayloadAction<boolean>) => {
      state.isSide = action.payload;
      state.swapState = "swapping";
    },
    setCurrCourseID: (state, action: PayloadAction<string>) => {
      state.currentCourseID = action.payload;
    },
    setCurrConceptID: (state, action: PayloadAction<string>) => {
      state.currentConceptID = action.payload;
    },
    endSwapState: (state) => {
      state.swapState = "swapped";
    },
  },
});

export const getStrategicSliceState = (state: AppStateTypeSSR) =>
  state.strategicSide;
