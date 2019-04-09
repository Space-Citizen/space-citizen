import React, { Component } from 'react';
import { get } from '../../misc/axios';
import Loading from '../misc/loading';
import UserCard from '../profile/userCard';
import "../css/profile.css";

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      profile_info: undefined
    };
  }

  componentDidMount() {
    get("/api/users/info/" + this.props.match.params.userId).then(response => {
      this.setState({ profile_info: response.data });
    });
  }

  render() {
    const { profile_info } = this.state;

    if (!profile_info)
      return (<Loading />);
    return (
      <div className="row profile-container">
        {/* User informations  */}
        <div className="col-2 profile-user-card mt-3">
          <UserCard user={profile_info} />
        </div>
        {/* Other informations, posts, etc .. */}
        <div className="col m-3">
          <p>Level:</p>
          <p>Time played:</p>
          <p>Kills:</p>
        </div>
      </div>);
  }
}

export default Profile;
