import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { get } from '../../misc/axios';
import Leftnav from '../navbar/leftnav';
import Hangar from './hangar';
import Shop from './shop';
import { isConnected } from '../../misc/token';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            connectedUser: []
        };
        this.refreshUser = this.refreshUser.bind(this);
    };

    componentDidMount() {
        get('/api/me/info').then(response => {
            this.setState({ connectedUser: response.data });
        });
    }

    refreshUser() {
        get('/api/me/info').then(response => {
            this.setState({ connectedUser: response.data });
        });
    }

    render() {
        //display a loading screen during the loading of the token
        if (!isConnected()) {
            return <Redirect to='/signIn' />
        }
        return (
            <div>
                <div className="row">
                    <div className="col-2">
                        <Leftnav />
                    </div>
                    <div className="col-10">
                        <Route path="/game/hangar" render={(props) => <Hangar {...props} connectedUser={this.state.connectedUser} />} />
                        <Route path="/game/shop" render={(props) => <Shop {...props} connectedUser={this.state.connectedUser} refreshUserInfo={this.refreshUser} />} />
                    </div>
                </div>
            </div>
        )
    }
};

export default Game;
