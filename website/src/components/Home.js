import React, { Component } from 'react';
import Navbar from './navbar/navbar';
import { Redirect } from 'react-router-dom';
import './css/home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      authToken: -1
    }
  };

  componentDidMount() {
    this.setState({ authToken: localStorage.getItem("x-access-token") });
  }

  render() {
    if (this.state.authToken === -1) {
      return (<p>Loading...</p>);
    }
    if (this.state.authToken !== null) {
      return <Redirect to='/game' />
    }
    return (
      <div>
        <Navbar />
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
