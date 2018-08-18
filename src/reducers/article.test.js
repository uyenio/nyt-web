import reducer, { INITIAL_STATE } from './article';
import { GET_ARTICLES, GET_ARTICLES_SUCCESS, GET_ARTICLES_FAIL } from '../constants/article';

describe('article reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle GET_ARTICLES', () => {
    const action = {
      type: GET_ARTICLES
    };
    expect(reducer({}, action)).toEqual({
      error: null,
      isLoading: true
    });
  });

  it('should handle GET_ARTICLES_SUCCESS', () => {
    const action = {
      type: GET_ARTICLES_SUCCESS,
      payload: ['test'],
      currentPage: 1
    };
    expect(reducer({}, action)).toEqual({
      currentPage: 1,
      data: ['test'],
      error: null,
      isLoading: false
    });
  });

  it('should handle GET_ARTICLES_FAIL', () => {
    const action = {
      type: GET_ARTICLES_FAIL,
      payload: 'Test'
    };
    expect(reducer({}, action)).toEqual({
      data: null,
      error: 'Test',
      isLoading: false
    });
  });
});
