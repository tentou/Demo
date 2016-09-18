import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import todoApp from 'stores/reducers.js';

export let store = createStore(todoApp);

// Render the main component into the dom
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
