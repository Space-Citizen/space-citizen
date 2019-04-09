import React, { Component } from 'react';
import ChangeLog from '../changelog/changelog';
import LeaderBoard from '../leaderboard/leaderboard';

class CoreHome extends Component {
  render() {
    return (
      <div className="container">
        <ChangeLog />
        <LeaderBoard />
      </div>
    );
  }
}

export default CoreHome;
