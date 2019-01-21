// import React, { Component } from 'react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import Game from './components/game/game';
import Hangar from './components/game/hangar';
import Shop from './components/game/shop';

const NoMatch = () => <div><h1>No page. 404</h1></div>;

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="/game" component={Game} />
      <Route path="/hangar" component={Hangar} />
      <Route path="/shop" component={Shop} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default App;
