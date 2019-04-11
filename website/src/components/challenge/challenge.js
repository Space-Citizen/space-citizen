import React, { Component } from 'react';
import { get, post } from '../../misc/axios';
import { createNotification } from '../misc/notification';

class Challenge extends Component {

  startChallenge() {
    post('/api/challenge/' + this.props.connectedUser.id, []).then(response => {
      createNotification("success", response.data.success);
    });
  }

  getReward() {
    get('/api/challenge/' + this.props.connectedUser.id, []).then(response => {
      var d = new Date();
      var date = response.data.date;
      d.setTime(date * 1000);
      var cdate = new Date();
      var diff = (cdate - d) / 1000;
      if (diff < 10) {
        createNotification('error', 'Challenge not completed', 'Challenge');
      } else {
        var userMoney = document.getElementById("user-info-money");
        if (!userMoney)
          return;
        userMoney.innerHTML = Number(userMoney.innerHTML) + 500;
        post('/api/challenge/del/' + this.props.connectedUser.id, []).then(response => {
          createNotification("success", 'Challenge completed + $500');
        });
      }
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">
                <b><i className="fas fa-star mr-2"></i>Challenge</b>
              </div>
              <div className="card-body">
                <h5 className="card-title">Challenge of the day</h5>
                <p className="card-text">Buy an Item from the Marketplace</p>
                <p className="card-text">Get $500</p>
                <button type="button" className="btn btn-primary mr-2" onClick={() => this.startChallenge()}>Start</button>
                <button type="button" className="btn btn-warning" onClick={() => this.getReward()}>Get Reward</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Challenge;
