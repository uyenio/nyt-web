import { combineReducers } from 'redux';
import articleReducer from './article';

export default combineReducers({
  article: articleReducer
});
