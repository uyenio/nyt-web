import axios from 'axios';
import { GET_ARTICLES, GET_ARTICLES_FAIL, GET_ARTICLES_SUCCESS } from '../constants/article';
import { NYT_API_KEY, NYT_API_ENDPOINT } from '../constants/api'

export function getArticles(params = {}) {
  return (dispatch) => {
    dispatch({ type: GET_ARTICLES });
    return axios
      .get(`${NYT_API_ENDPOINT}/articlesearch.json`, {
        params: {
          ...params,
          'api-key': NYT_API_KEY,
          'q': 'australia'
        }
      })
      .then((response) => {
        dispatch({
          type: GET_ARTICLES_SUCCESS,
          payload: response.data,
          currentPage: params.page || 0
        });
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        dispatch({
          type: GET_ARTICLES_FAIL,
          payload: err
        });
        return Promise.reject(err);
      });
  };
}
