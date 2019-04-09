import React, { Component } from 'react';

class Challenge extends Component {

  constructor() {
    super();
    this.state = {
      items: []
    };
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
                <p className="card-text">WIP</p>
                <button type="button" className="btn btn-primary">Get</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Challenge;
