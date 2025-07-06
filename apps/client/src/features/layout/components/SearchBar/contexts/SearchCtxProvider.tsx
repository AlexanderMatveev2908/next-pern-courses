/** @jsxImportSource @emotion/react */
"use client";

import { useReducer, type FC } from "react";
import { SearchCtx } from "./SearchCtx";
import { useSearchCtxProvider } from "./hooks/useSearchCtxProvider";
import { searchCtxInitState } from "./reducer/initState";
import { reducerSearchReact } from "./reducer/reducer";

type PropsType = {
  children: React.ReactNode;
};

const SearchCtxProvider: FC<PropsType> = ({ children }) => {
  const [stateReact, dispatchReact] = useReducer(
    reducerSearchReact,
    searchCtxInitState,
  );

  return (
    <SearchCtx.Provider
      {...{
        value: {
          ...useSearchCtxProvider({
            stateReact,
            dispatchReact,
          }),
        },
      }}
    >
      {children}
    </SearchCtx.Provider>
  );
};

export default SearchCtxProvider;
