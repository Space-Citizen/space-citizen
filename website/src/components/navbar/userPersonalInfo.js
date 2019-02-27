import React, { Component } from 'react';
import { get } from '../../misc/axios';
import Loading from '../misc/loading';

class UserPersonalInfo extends Component {
    constructor() {
        super();
        this.state = {
            user_info: undefined
        };
    }

    componentDidMount() {
        get('/api/me/info').then(info => {
            this.setState({ user_info: info.data });
        });
    }

    render() {
        const { user_info } = this.state;

        if (!user_info)
            return (<Loading />);
        return (
            <div className="col-lg-2 col-md-4 col-sm-4 offset-lg-5 navbar-user-info-box">
                <div className="float-right">
                    <div className="row">
                        <div className="col-6">
                            <i className="fas fa-money-bill"></i>
                            <span className="navbar-user-info-box-text" id="user-info-money">{user_info.money}</span>
                        </div>
                        <div className="col-6">
                            <div className="float-left">
                                <i className="fas fa-trophy"></i>
                                <span className="navbar-user-info-box-text">10</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <i className="fas fa-globe-americas"></i>
                            <span className="navbar-user-info-box-text">NA</span>
                        </div>
                        <div className="col-6">
                            <div className="float-left">
                                <i className="fas fa-user-friends"></i>
                                <span className="navbar-user-info-box-text">{user_info.faction.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserPersonalInfo;