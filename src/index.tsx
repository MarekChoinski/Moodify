import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import { Provider,} from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension"
import Head from './components/Head/Head';

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(rootReducer, (process.env.NODE_ENV !== "production") ?
  composeWithDevTools(applyMiddleware(thunk))
  : applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Head />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
