import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LaunchPrograms from './components/launch-programs/LaunchPrograms';
import history from './history';
import './App.scss';

const App = () => {

  return (
    <div className="app">
      <Router history={history}>
        <Header className="app_content" />
        <div className="app__content">
          <Route path="/" component={LaunchPrograms} />
        </div>
        <Footer developerName="shriram" />
      </Router>
    </div>
  );
}

export default App;
