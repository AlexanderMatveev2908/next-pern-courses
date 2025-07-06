import { createContext } from "react";
import { SearchCtxValsType } from "./hooks/useSearchCtxProvider";

export const SearchCtx = createContext<SearchCtxValsType | null>(null);
