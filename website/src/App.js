// import React, { Component } from 'react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import Core from './components/core/core';
import Navbar from './components/navbar/navbar';
import NavbarLoggedOut from './components/navbar/navbarLoggedOut';
import Profile from './components/core/profile/profile';
import Changelog from './components/changelog/changelog';
import { NotificationContainer } from 'react-notifications';
import { isConnected } from './misc/token';
import 'react-notifications/lib/notifications.css';

const NoMatch = () => <div><h1 style={{ color: "white" }}>No page. 404</h1></div>;

const App = () => {
  return (
    <div style={{ backgroundColor: "#222930" }}>
      {/* Display navbar */}
      {isConnected() ? <Navbar /> : <NavbarLoggedOut />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/changelog" component={Changelog} />
        <Route path="/core" component={Core} />
        <Route path="/profile/:userId" component={Profile} />
        <Route component={NoMatch} />
      </Switch>
      <NotificationContainer />
    </div>
  );
};

export default App;
