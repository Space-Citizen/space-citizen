// import React, { Component } from 'react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import SignIn from './components/auth/signin'
import Game from './components/game/game'

const NoMatch = () => <div><h1>No page. 404</h1></div>;

const App = () => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route path="/game" component={Game} />
        {/* <Route path="/contact" component={Contact} /> */}
        <Route component={NoMatch} />
      </Switch>
    );
};

export default App;
