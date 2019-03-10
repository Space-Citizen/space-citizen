import React, { Component } from 'react';
import axios from 'axios';
import '../css/changelog.css';

class Changelog extends Component {

  constructor() {
    super();
    this.state = {
      commits: []
    }
  }

  componentDidMount() {
    axios.get('https://api.github.com/repos/Space-Citizen/space-citizen/commits').then(res => {
      var tmp = res.data.slice(0, 15); // reduce responce to 15 commits
      this.setState({
        commits: tmp
      });
    });
  }

  // Diplay commit date + message
  displayCommits() {
    return (
      this.state.commits.map(commit => {
        var date = new Date(commit.commit.author.date);
        return (
          <tr key={commit.sha}>
            <th scope="raw">{date.toDateString()}</th>
            <td>{commit.commit.message}</td>
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
            <h1>Changelog</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              <tbody>
                {this.displayCommits()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Changelog;
