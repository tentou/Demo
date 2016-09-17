import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import todoApp from 'stores/reducers.js';

let store = createStore(todoApp);    //存储reducers  reducers主要是处理状态变换的一个函数
// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
