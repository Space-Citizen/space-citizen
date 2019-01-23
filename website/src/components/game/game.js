import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import axios from 'axios';
import Leftnav from '../navbar/leftnav';
import Hangar from './hangar';
import Shop from './shop';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            authToken: -1,
            connectedUser: []
        };
        this.token = localStorage.getItem("x-access-token");
        this.refreshUser = this.refreshUser.bind(this);
    };

    componentDidMount() {
        axios.get('/api/me/info', { headers: { "x-access-token": this.token } }).then(response => {
            if (response.data.error) {
                alert(response.data.error);
                window.location = "/signin";
                return;
            }
            this.setState({ connectedUser: response.data });
        });
    }

    refreshUser() {
        axios.get('/api/me/info', { headers: { "x-access-token": this.token } }).then(response => {
            if (response.data.error) {
                alert(response.data.error);
                window.location = "/signin";
                return;
            }
            this.setState({ connectedUser: response.data });
        });
    }

    render() {
        //display a loading screen during the loading of the token
        if (this.token === -1) {
            return (<p>Loading...</p>);
        }
        if (this.token === null) {
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
