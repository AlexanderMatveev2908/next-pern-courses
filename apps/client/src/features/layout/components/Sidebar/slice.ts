import { AppStateTypeSSR } from "@/core/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideStateType = {
  isOpen: boolean;
};

const init: SideStateType = {
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

export const getSideState = (state: AppStateTypeSSR) => state.side;
