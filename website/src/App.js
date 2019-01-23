// import React, { Component } from 'react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import Game from './components/game/game';
import Navbar from './components/navbar/navbar';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const NoMatch = () => <div><h1 style={{ color: "white" }}>No page. 404</h1></div>;

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/game" component={Game} />
        <Route component={NoMatch} />
      </Switch>
      <NotificationContainer />
    </div>
  );
};

export default App;
