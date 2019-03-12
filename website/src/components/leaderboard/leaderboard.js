import React, { Component } from 'react';
import { get } from '../../misc/axios';
import '../css/leaderboard.css';

class Leaderboard extends Component {

  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    get('/api/users').then(res => {
      this.setState({
        users: res.data
      });
    });
  }

  displayPlayers() {
    var rank = 0;
    return (
      this.state.users.map(user => {
        rank++;
        var picture = '/public/profile_pictures/' + user.profile_picture;
        return (
          <tr key={user.id}>
            <th scope="raw">#{rank}</th>
            <td><img src={picture} className="img-thumbnail h-25 mr-2" alt="" /> {user.username}</td>
            <td>{user.money}</td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <div className="container mt-5 changelog">
        <div className="row mb-5">
          <div className="col">
            <h1>Leaderboard</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Money</th>
                </tr>
              </thead>
              <tbody>
                {this.displayPlayers()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
