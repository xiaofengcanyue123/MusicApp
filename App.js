/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from './src/reducers/allReducers';

import MyNavigators from './src/navigators/mynavigator';

const createStoreWithMiddleware = applyMiddleware(thunk, promiseMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const App= ()  => {
  return (
    <Provider store={store} >
    <MyNavigators/>
    </Provider>
  );
};

export default App;
