import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { get } from '../../misc/axios';
import '../css/market.css';

class Market extends Component {

  constructor() {
    super();
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    get('/api/leaderboard/money').then(res => {
      this.setState({
        items: res.data
      });
    });
  }

  displayItems() {
    return (
      this.state.items.map((user, index) => {
        return (
          <tr key={user.id}>
            <th scope="raw">#{index + 1}</th>
            <td>tmp</td>
            <td>tmp</td>
            <td>tmp</td>
            <td>tmp</td>
            <td><button className="btn btn-warning">Buy</button></td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <div className="container mt-5 market">
        <div className="row mb-5">
          <div className="col">
            <h1>Marketplace</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Icon</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Type</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.displayItems()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Market;
