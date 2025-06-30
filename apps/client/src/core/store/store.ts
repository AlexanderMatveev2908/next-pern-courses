import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { sideSlice } from "@/features/layout/components/Sidebar/slice";

export const store = configureStore({
  reducer: {
    api: api.reducer,
    side: sideSlice.reducer,
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
