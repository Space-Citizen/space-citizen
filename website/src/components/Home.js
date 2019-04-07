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
        <div className="container my-5 text-light">
          <div className="row text-center">
            <div className="col">
              <h2>Watch the Tutorial</h2>
              <video className="embed-responsive embed-responsive-16by9" controls>
                <source src="/videos/tutorial.mp4" type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
