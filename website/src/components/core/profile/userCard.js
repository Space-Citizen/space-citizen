import React, { Component } from 'react';
import { get, post } from '../../../misc/axios';
import Loading from '../../misc/loading';
import '../../css/profile.css';

class UserCard extends Component {
  constructor() {
    super();
    this.state = {
      faction: undefined,
      isFriend: undefined
    }
  }
  componentDidMount() {
    get('/api/factions/info/' + this.props.user.faction).then(faction => {
      this.setState({ faction: faction.data });
    })
    get('/api/friends/isfriend/' + this.props.user.id).then(response => {
      this.setState({ isFriend: response.data });
    }).catch(err => this.setState({ isFriend: 0 }));

  }

  addFriend() {
    post('/api/friends/addfriend/' + this.props.user.id, [])
      .then(() => {
        this.setState({ isFriend: true });
      })
  }

  removeFriend() {
    post('/api/friends/removefriend/' + this.props.user.id, [])
      .then(() => {
        this.setState({ isFriend: false });
      })
  }


  render() {
    const { user, is_my_profile } = this.props;
    const { faction, isFriend } = this.state;

    if (!user || !faction)
      return (<Loading />);
    return (
      <div className="mt-2 text-center">
        <img className="col-10 offset-1" src={"/public/profile_pictures/" + user.profile_picture} alt="avatar" />
        <h1 className="text-center">{user.username}</h1>
        {/* Hide the 'send a message' button if it's the user's profile */}
        <a className="btn btn-secondary col-10 offset-1" href={"/messages/" + user.id} hidden={is_my_profile}>Send a message</a>
        <button hidden={is_my_profile || isFriend}
          onClick={(e) => this.addFriend(e)}
          type="button" className="btn btn-success mt-2">
          <i className="fas fa-user-friends mr-2"></i>Add friend
        </button>
        <button hidden={is_my_profile || !isFriend}
          onClick={(e) => this.removeFriend(e)}
          type="button" className="btn btn-danger mt-2">
          <i className="fas fa-user-friends mr-2"></i>Remove friend
        </button>
      </div >
    );
  }
}

export default UserCard;
