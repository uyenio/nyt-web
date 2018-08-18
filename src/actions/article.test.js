import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import axios from 'axios';
import { getArticles } from './article';
import { GET_ARTICLES, GET_ARTICLES_FAIL, GET_ARTICLES_SUCCESS } from '../constants/article';

const mockStore = configureMockStore([thunk]);

describe('Article Actions', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('getArticles action', () => {
    it('should dispatch correct if API called success', (done) => {
      const store = mockStore({});
      const EXPECTED_ACTIONS = [
        {
          type: GET_ARTICLES
        },
        {
          type: GET_ARTICLES_SUCCESS,
          payload: { test: 'abc' },
          currentPage: 0
        }
      ];
      sandbox
        .stub(axios, 'get')
        .returns(new Promise((resolve, reject) => resolve({ data: [] })));
      store
        .dispatch(getArticles())
        .then(() => {
          expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should dispatch correct if API called failed', (done) => {
      const store = mockStore({});
      const EXPECTED_ACTIONS = [
        {
          type: GET_ARTICLES
        },
        {
          type: GET_ARTICLES_FAIL,
          payload: new Error('Fake Error')
        }
      ];
      sandbox
        .stub(axios, 'get')
        .returns(new Promise((resolve, reject) => reject(new Error('Fake Error'))));
      store.dispatch(getArticles()).catch((err) => {
        expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
        done();
      });
    });
  });
});
