/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { sideSlice } from "@/features/layout/components/Sidebar/slice";
import { toastSlice } from "@/features/layout/components/Toast/slice";

export const store = configureStore({
  reducer: {
    api: api.reducer,
    side: sideSlice.reducer,
    toast: toastSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

  devTools: {
    name: "next-courses-app",
    trace: true,
  },
});

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export const genStoreRTK = (preloadedState?: any) =>
  configureStore({
    reducer: {
      api: api.reducer,
      side: sideSlice.reducer,
      toast: toastSlice.reducer,
    } as any,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),

    preloadedState,

    devTools: {
      name: "next-courses-app",
      trace: true,
    },
  });

export type StoreTypeSSR = ReturnType<typeof genStoreRTK>;

export type DispatchTypeSSR = StoreTypeSSR["dispatch"];
