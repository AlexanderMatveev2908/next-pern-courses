import { AppStateTypeSSR } from "@/core/store/store";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type DummyItem = {
  id: string;
  val: string | number;
};

const dummyAdapter = createEntityAdapter<DummyItem>();

const initState = {
  ...dummyAdapter.getInitialState(),
  isWakeUp: false,
};

export const wakeUpSlice = createSlice({
  name: "wakeUp",
  initialState: initState,
  reducers: {
    setDummyItem: dummyAdapter.setOne,
    addDummyItem: dummyAdapter.addOne,

    addAllDummyItems: dummyAdapter.setMany,
    setAllDummyItems: dummyAdapter.setAll,
    clearDummyItems: dummyAdapter.removeAll,

    updateDummyItem: dummyAdapter.updateOne,
    removeDummyItem: dummyAdapter.removeOne,

    setIsWakeUp: (state, action: PayloadAction<boolean>) => {
      state.isWakeUp = action.payload;
    },
  },
});

export const getWakeUkState = (state: AppStateTypeSSR) => state.wakeUp;

export const { selectById: getDummyItemByID, selectAll: getAllDummyItems } =
  dummyAdapter.getSelectors(getWakeUkState);
