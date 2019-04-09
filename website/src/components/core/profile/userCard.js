import React, { Component } from 'react';
import { get } from '../../../misc/axios';
import Loading from '../../misc/loading';
import '../../css/profile.css';

class UserCard extends Component {
    constructor() {
        super();
        this.state = {
            faction: undefined
        }
    }
    componentDidMount() {
        get('/api/factions/info/' + this.props.user.faction).then(faction => {
            this.setState({ faction: faction.data });
        })
    }

    render() {
        const { user, is_my_profile } = this.props;
        const { faction } = this.state;

        if (!user || !faction)
            return (<Loading />);
        return (
            <div className="mt-2">
                <img className="col-10 offset-1" src={"/public/profile_pictures/" + user.profile_picture} alt="avatar" />
                <h1 className="text-center">{user.username}</h1>
                {/* Hide the 'send a message' button if it's the user's profile */}
                <a className="btn btn-secondary col-10 offset-1" href={"/messages/" + user.id} hidden={is_my_profile}>Send a message</a>
            </div >
        );
    }
}

export default UserCard;
