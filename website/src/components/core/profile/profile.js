import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { get } from '../../../misc/axios';
import Loading from '../../misc/loading';
import UserCard from '../profile/userCard';
import "../../css/profile.css";

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      profile_info: undefined,
      friends: undefined
    };
    this.is_my_profile = undefined;
  }

  componentDidMount() {
    if (this.props.connectedUser) {
      this.setState({ profile_info: this.props.connectedUser });
      this.is_my_profile = true;
      get('/api/friends/getfriends/' + this.props.connectedUser.id).then(response => {
        response.data.map(user => {
          return get('/api/users/public_info/' + user.subscribed_to).then(res => {
            var tmp = [];
            if (this.state.friends) tmp = this.state.friends;
            tmp.push(res.data);
            this.setState({ friends: tmp });
          });
        });
      });
      return;
    }
    this.is_my_profile = false;
    get("/api/users/public_info/" + this.props.match.params.userId).then(response => {
      this.setState({ profile_info: response.data });
    });


  }

  displayFriends() {
    if (!this.state.friends) return;
    return (
      this.state.friends.map((user, index) => {
        return (
          <tr key={user.id}>
            <th scope="raw">#{index + 1}</th>
            <td>
              <Link to={"/profile/" + user.id} >
                <img src={'/public/profile_pictures/' + user.profile_picture} className="img-thumbnail h-25 mr-2" alt="profile" /> {user.username}
              </Link>
            </td>
            <td>{user.level}</td>
          </tr>
        );
      })
    );
  }

  render() {
    const { profile_info, friends } = this.state;
    const { is_my_profile } = this;
    console.log(friends);
    if (!profile_info || is_my_profile === undefined) {
      return (<Loading />);
    }
    // used start the progress bar at the beginning instead of the middle
    var startOffset = profile_info.nextLevelExperience / 2;
    // Calculate the progression of the bar
    const levelProgression = (200 * (profile_info.experience - startOffset)) / profile_info.nextLevelExperience;

    return (
      <div className="row profile-container">
        <div className="col-2 profile-user-card">
          <UserCard user={profile_info} is_my_profile={is_my_profile} />
        </div>
        {/* User informations  */}
        <section className="col-10">
          <div className="row profile-user-info mt-2">
            <div className="col-6 text-center">
              <div className="profile-user-info-title mb-3">
                <i className="fas fa-star mr-1"></i>
                <span>Level {profile_info.level}</span>
              </div>
              <b>Progression</b>
              <div className="progress">
                <span className="profile-user-info-levels-left mr-2">{profile_info.level}</span>
                <div className="progress-bar bg-warning mr-2" role="progressbar" style={{ width: levelProgression + "%" }} aria-valuenow={levelProgression} aria-valuemin="0" aria-valuemax="100">
                  <span className="profile-user-info-experience">{profile_info.experience} / {profile_info.nextLevelExperience}</span>
                </div>
                <span className="profile-user-info-levels-right">{profile_info.level + 1}</span>
              </div>
              <div className="col mt-3">
                <b>Kills</b>
                <p>7</p>
              </div>
            </div>
            <div className="col-6">
              <div className="profile-user-info-title mb-3 text-center">
                <i className="fas fa-chart-bar mr-1"></i>
                <span>Leaderboard</span>
              </div>
              <div className="row">
                <p>Experience:</p>
                <p>Wealth:</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2>Friends</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {this.displayFriends()}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div >
    );
  }
}

export default Profile;
