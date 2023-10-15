import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import noteReducer from './reducers/noteReducer.js';

const store = createStore(noteReducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
