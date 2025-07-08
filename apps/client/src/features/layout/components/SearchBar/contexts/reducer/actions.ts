export enum SearchCtxActions {
  SET_BAR = "SET_BAR",
  SET_IS_PENDING = "SET_IS_PENDING",
  SET_CHECK_PRE_SUBMIT = "SET_CHECK_PRE_SUBMIT",
  SET_PAGINATION = "SET_PAGINATION",
  SET_INNER_JOIN_CAT = "SET_INNER_JOIN_CAT",
  SET_SEARCHER = "SET_SEARCHER",
  RESET_DATA = "RESET_DATA",
  CLEAR_PENDING = "CLEAR_PENDING",
}

export type ParamsBar = {
  el: "filterBar" | "sortBar";
  val: boolean | null;
};

export type ParamsSearch = {
  el: "currFilter";
  val: string;
};

export type ParamsPending = {
  el: "submit" | "clear";
  val: boolean;
};

export type ParamsPagination = {
  el: "limit" | "page" | "block";
  val: number;
};

export type ParamsCheckSubmit = {
  el: "isFormValid" | "isPopulated" | "canMakeAPI";
  val: boolean;
};

export type SearchCtxActionsType =
  | {
      type: SearchCtxActions.SET_BAR;
      payload: ParamsBar;
    }
  | {
      type: SearchCtxActions.SET_SEARCHER;
      payload: ParamsSearch;
    }
  | {
      type: SearchCtxActions.SET_IS_PENDING;
      payload: ParamsPending;
    }
  | {
      type: SearchCtxActions.SET_CHECK_PRE_SUBMIT;
      payload: ParamsCheckSubmit;
    }
  | {
      type: SearchCtxActions.SET_PAGINATION;
      payload: ParamsPagination;
    }
  | {
      type: SearchCtxActions.SET_INNER_JOIN_CAT;
      payload: string[];
    }
  | {
      type: SearchCtxActions.RESET_DATA;
    }
  | {
      type: SearchCtxActions.CLEAR_PENDING;
    };
