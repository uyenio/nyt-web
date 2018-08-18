import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HomePage from './containers/HomePage';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import rootReducer from './reducers';
import middlewares from './middlewares'

const store = createStore(
  rootReducer,
  middlewares
);

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
