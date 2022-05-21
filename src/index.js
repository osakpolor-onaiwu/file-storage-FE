import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import './App.css';
import { legacy_createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import root_reducer from './redux/reducers/root_reducer'
import { Provider } from 'react-redux'

const store = legacy_createStore(
  root_reducer,
  compose(applyMiddleware(thunk.withExtraArgument()))
)

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)



