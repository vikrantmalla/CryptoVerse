import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import AppContext from './context/AppContext';

ReactDOM.render(
  <AppContext>
  <Router>
    <App />
  </Router>
  </AppContext>,
  document.getElementById('root')
);
