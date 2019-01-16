import React, { Component } from 'react';
import Navbar from './navbar/navbar';
import { Redirect } from 'react-router-dom'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      authToken: -1
    }
  };

  componentDidMount() {
    this.setState({authToken: localStorage.getItem("x-access-token")});
  }

  render() {
    if (this.state.authToken === -1)
    {
      return (<p>Loading...</p>);
    }
    if (this.state.authToken !== null) {
      return <Redirect to='/game' />
    }
    return (
      <div>
        <Navbar/>
      </div>
    );
  }
};

export default Home;
