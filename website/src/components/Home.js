import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isConnected } from '../misc/token';
import './css/home.css';

class Home extends Component {
  render() {
    // redirect to core if user is already connected
    if (isConnected()) {
      return <Redirect to='/core' />
    }
    return (
      <div>
        <div className="container home-description-container">
          <h1 className="text-center home-title">Welcome to Space Citizen !</h1>
          <div className="home-description">
            <p>Are you ready to fight for your planet and defend it against it's enemies ?</p>
            <p>Let's find out ! <a href="/signup">Start the battle !</a></p>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
