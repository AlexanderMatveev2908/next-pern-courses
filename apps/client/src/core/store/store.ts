/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { api } from "./api";
import { sideSlice } from "@/features/layout/components/Sidebar/slice";
import { toastSlice } from "@/features/layout/components/Toast/slice";
import { wakeUpSlice } from "@/features/wakeUp/slices/wakeUpSlice";

// export const store = configureStore({
//   reducer: {
//     api: api.reducer,
//     side: sideSlice.reducer,
//     toast: toastSlice.reducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),

//   devTools: {
//     name: "next-courses-app",
//     trace: true,
//   },
// });

// export type AppStateType = ReturnType<typeof store.getState>;
// export type AppDispatchType = typeof store.dispatch;

const rootReducer = {
  api: api.reducer,
  side: sideSlice.reducer,
  toast: toastSlice.reducer,
  wakeUp: wakeUpSlice.reducer,
};

export const genStoreRTK = (preloadedState?: any) =>
  configureStore({
    reducer: rootReducer as unknown as Reducer<any>,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),

    preloadedState,

    devTools: {
      name: "next-courses-app",
      trace: true,
    },
  });

export type StoreTypeSSR = ReturnType<
  ReturnType<typeof genStoreRTK>["getState"]
>;

export type DispatchTypeSSR = StoreTypeSSR["dispatch"];
