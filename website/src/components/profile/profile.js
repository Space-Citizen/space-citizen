import React, { Component } from 'react';
import { get } from '../../misc/axios';
import Loading from '../misc/loading';
import "../css/profile.css";

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            profile_info: undefined
        };
    }

    componentDidMount() {
        get("/api/users/profile_info/" + this.props.match.params.userId).then(response => {
            this.setState({ profile_info: response.data });
        });
    }

    displayUserInformations() {
        const { profile_info } = this.state;

        if (!profile_info)
            return (<Loading />);
        return (
            <div>
                <img className="col-10 offset-1" src={"/public/profile_pictures/" + profile_info.profile_picture} alt="avatar" />
                <h1 className="text-center">{profile_info.username}</h1>
                <a className="btn btn-secondary col-10 offset-1" href={"/messages/" + profile_info.id}>Send a message</a>
            </div>
        );
    }

    render() {
        return (<div className="row profile-container">
            {/* User informations  */}
            <div className="col-2 profile-user-card">
                {this.displayUserInformations()}
            </div>
            {/* Other informations, posts, etc .. */}
            <div className="col-10">

            </div>
        </div>);
    }
}

export default Profile;
