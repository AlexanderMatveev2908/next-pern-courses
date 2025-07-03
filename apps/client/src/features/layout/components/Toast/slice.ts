import { ApiEventType } from "@/common/types/api";
import { AppStateType } from "@/core/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export type ToastType = {
  msg: string;
  type: ApiEventType;
};

export type ToastStateType = {
  isShow: boolean;
  toast: ToastType;
  id: string;
};

const init: ToastStateType = {
  isShow: false,
  toast: { msg: "", type: "success" as ApiEventType },
  id: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState: init,
  reducers: {
    open: (
      state,
      action: PayloadAction<{
        msg: string;
        type: ApiEventType;
      }>,
    ) => {
      state.isShow = true;
      state.toast = action.payload;
      state.id = v4();
    },
    close: (state) => {
      state.isShow = false;
    },

    force: (state) => {
      state.isShow = true;
      state.id = v4();
    },
  },
});

export const getToastState = (state: AppStateType) => state.toast;
