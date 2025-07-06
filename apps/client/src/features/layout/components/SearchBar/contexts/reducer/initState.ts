import { getLimitPage } from "../../lib/style";

export type SearchCtxStateType = {
  bars: {
    filterBar: boolean;
    sortBar: boolean;
  };
  pagination: {
    page: number;
    limit: number;
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
    filterBar: false,
    sortBar: false,
  },
  pagination: {
    page: 0,
    limit: getLimitPage(),
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
