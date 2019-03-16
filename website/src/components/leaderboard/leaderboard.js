import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
    get('/api/users/money_leaderboard').then(res => {
      this.setState({
        users: res.data
      });
    });
  }

  displayPlayers() {
    return (
      this.state.users.map((user, index) => {
        return (
          <tr key={user.id}>
            <th scope="raw">#{index + 1}</th>
            <td>
              <Link to={"/profile/" + user.id} >
                <img src={'/public/profile_pictures/' + user.profile_picture} className="img-thumbnail h-25 mr-2" alt="profile" /> {user.username}
              </Link>
            </td>
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
