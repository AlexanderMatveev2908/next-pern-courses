import { StoreTypeSSR } from "@/core/store/store";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

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

    setDummyItems: dummyAdapter.setMany,
    clearDummyItems: dummyAdapter.removeAll,

    updateDummyItem: dummyAdapter.updateOne,
    removeDummyItem: dummyAdapter.removeOne,
  },
});

export const getWakeUkState = (state: StoreTypeSSR) => state.wakeUp;

export const { selectById: getDummyItemByID, selectAll: getAllDummyItems } =
  dummyAdapter.getSelectors(getWakeUkState);
