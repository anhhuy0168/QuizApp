import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import QuizContextProvider from './contexts/QuizContext';
import HomePage from './view/HomePage';

function App() {
  return (
    <QuizContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </Router>
    </QuizContextProvider>
  );
}

export default App;
