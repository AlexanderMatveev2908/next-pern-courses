import { AppStateTypeSSR } from "@/core/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState = {
  isSide: false,
};

export const leftSideSLice = createSlice({
  name: "leftSide",
  initialState: initState,
  reducers: {
    setSide: (state, action: PayloadAction<boolean>) => {
      state.isSide = action.payload;
    },
  },
});

export const getLeftSideState = (state: AppStateTypeSSR) => state.leftSide;
