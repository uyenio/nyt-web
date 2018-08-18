import { GET_ARTICLES, GET_ARTICLES_SUCCESS, GET_ARTICLES_FAIL } from '../constants/article';

export const INITIAL_STATE = {
  data: null,
  isLoading: false,
  error: null,
  currentPage: 0
};

export default function(state = INITIAL_STATE, action) {
  const { payload, currentPage } = action;
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
        error: null,
        currentPage
      };
    case GET_ARTICLES_FAIL:
      return {
        ...state,
        data: null,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
