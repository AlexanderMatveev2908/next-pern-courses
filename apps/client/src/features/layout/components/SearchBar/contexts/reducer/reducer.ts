import { __cg } from "@shared/first/lib/logger.js";
import { SearchCtxActions, SearchCtxActionsType } from "./actions";
import { searchCtxInitState, SearchCtxStateType } from "./initState";

export const reducerSearchReact = (
  state: SearchCtxStateType,
  action: SearchCtxActionsType,
): SearchCtxStateType => {
  switch (action.type) {
    case SearchCtxActions.SET_BAR: {
      const { el, val } = action.payload;

      return {
        ...state,
        bars: {
          ...state.bars,
          [el]: val,
        },
      };
    }

    case SearchCtxActions.SET_SEARCHER: {
      const { el, val } = action.payload;
      return {
        ...state,
        searchers: {
          ...state.searchers,
          [el]: val,
        },
      };
    }

    case SearchCtxActions.SET_IS_PENDING: {
      const { el, val } = action.payload;

      return {
        ...state,
        isSearchPending: {
          ...state.isSearchPending,
          [el]: val,
        },
      };
    }

    case SearchCtxActions.SET_PAGINATION: {
      const { el, val } = action.payload;
      return {
        ...state,
        pagination: {
          ...state.pagination,
          [el]: val,
        },
      };
    }

    case SearchCtxActions.SET_CHECK_PRE_SUBMIT: {
      const { el, val } = action.payload;

      return {
        ...state,
        checkPreSubmit: {
          ...state.checkPreSubmit,
          [el]: val,
        },
      };
    }

    case SearchCtxActions.SET_INNER_JOIN_CAT: {
      return {
        ...state,
        innerJoinCat: action.payload,
      };
    }

    case SearchCtxActions.RESET_DATA:
      return {
        ...state,
        pagination: {
          ...searchCtxInitState.pagination,
        },
      };

    case SearchCtxActions.CLEAR_PENDING:
      return {
        ...state,
        isSearchPending: {
          ...searchCtxInitState.isSearchPending,
        },
      };

    case SearchCtxActions.CLEAR_PAGINATION:
      return {
        ...state,
        pagination: {
          ...searchCtxInitState.pagination,
        },
      };

    default:
      __cg("unknown action", action);
      throw new Error("unknown action");
  }
};
