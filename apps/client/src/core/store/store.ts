import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { sideSlice } from "@/features/layout/components/Sidebar/slice";
import { toastSlice } from "@/features/layout/components/Toast/slice";
import { wakeUpSlice } from "@/features/wakeUp/slices/slice";
import { leftSideSLice } from "@/features/layout/components/LeftSideBar/slices/slice";

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

const rootReducer = combineReducers({
  api: api.reducer,
  side: sideSlice.reducer,
  leftSide: leftSideSLice.reducer,
  toast: toastSlice.reducer,
  wakeUp: wakeUpSlice.reducer,
});

export const genStoreRTK = (
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) =>
  configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),

    preloadedState,

    devTools: {
      name: "next-courses-app",
      trace: true,
    },
  });

export type StoreTypeSSR = ReturnType<typeof genStoreRTK>;
export type AppStateTypeSSR = ReturnType<StoreTypeSSR["getState"]>;
export type DispatchTypeSSR = StoreTypeSSR["dispatch"];
