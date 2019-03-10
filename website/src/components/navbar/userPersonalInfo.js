import React, { Component } from 'react';
import { get } from '../../misc/axios';
import Loading from '../misc/loading';

class UserPersonalInfo extends Component {
    constructor() {
        super();
        this.state = {
            user_info: undefined,
            faction_info: undefined
        };
    }

    componentDidMount() {
        get('/api/me/info').then(info => {
            this.setState({ user_info: info.data });
            get('/api/factions/info/' + info.data.faction).then(response => {
                this.setState({ faction_info: response.data });
            });
        });
    }

    render() {
        const { user_info, faction_info } = this.state;

        if (!user_info || !faction_info)
            return (<Loading />);
        return (
            <div className="leftnav-user-info-box">
                <div className="text-center leftnav-user-info-title">
                    <p>Player informations</p>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 leftnav-user-info">
                        <i className="fas fa-dollar-sign"></i>
                        <span className="leftnav-user-info-box-text" id="user-info-money">{user_info.money}</span>
                    </div>
                    <div className="col-6 col-md-12 col-sm-12 leftnav-user-info">
                        <div className="float-left">
                            <i className="fas fa-trophy"></i>
                            <span className="leftnav-user-info-box-text">10</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-12 col-sm-12 leftnav-user-info">
                        <i className="fas fa-globe-americas"></i>
                        <span className="leftnav-user-info-box-text">NA</span>
                    </div>
                    <div className="col-6 col-md-12 col-sm-12 leftnav-user-info">
                        <div className="float-left">
                            <i className="fas fa-user-friends"></i>
                            <span className="leftnav-user-info-box-text">{faction_info.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserPersonalInfo;