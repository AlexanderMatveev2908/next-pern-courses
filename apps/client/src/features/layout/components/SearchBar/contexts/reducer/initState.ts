import { getLimitPage } from "../../lib/style";

export type SearchCtxStateType = {
  bars: {
    filterBar: boolean | null;
    sortBar: boolean | null;
  };
  pagination: {
    page: number;
    limit: number;
    block: number;
  };
  searchers: {
    currFilter: string;
  };
  innerJoinCat: string[];
  isSearchPending: {
    submit: boolean;
    clear: boolean;
  };
  checkPreSubmit: {
    isFormValid: boolean;
    isPopulated: boolean;
    canMakeAPI: boolean;
  };
};

export const searchCtxInitState: SearchCtxStateType = {
  bars: {
    filterBar: null,
    sortBar: null,
  },
  pagination: {
    page: 0,
    limit: getLimitPage(),
    block: 0,
  },
  searchers: {
    currFilter: "",
  },
  innerJoinCat: [],
  isSearchPending: {
    submit: false,
    clear: false,
  },
  checkPreSubmit: {
    isFormValid: false,
    isPopulated: false,
    canMakeAPI: false,
  },
};
