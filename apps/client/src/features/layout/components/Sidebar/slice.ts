import { AppStateType } from "@/core/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const init = {
  isOpen: false,
};

export const sideSlice = createSlice({
  name: "side",
  initialState: init,

  reducers: {
    setSide: (state, act: PayloadAction<boolean>) => {
      state.isOpen = act.payload;
    },
  },
});

export const getSideState = (state: AppStateType) => state.side;
