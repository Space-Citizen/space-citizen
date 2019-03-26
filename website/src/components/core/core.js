import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { get } from '../../misc/axios';
import Leftnav from '../navbar/leftnav';
import Hangar from './hangar';
import Shop from './shop';
import Market from './market';
import { isConnected } from '../../misc/token';
import '../css/core.css';

class Core extends Component {
    constructor() {
        super();
        this.state = {
            connectedUser: []
        };
    };

    componentDidMount() {
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
            <div className="core-container">
                <div className="row">
                    <div className="col-2 core-leftnav-container">
                        <Leftnav />
                    </div>
                    <div className="col-10">
                        <Route path="/core/hangar" render={(props) => <Hangar {...props} connectedUser={this.state.connectedUser} />} />
                        <Route path="/core/shop" render={(props) => <Shop {...props} connectedUser={this.state.connectedUser} />} />
                        <Route path="/core/market" render={(props) => <Market {...props} connectedUser={this.state.connectedUser} />} />
                    </div>
                </div>
            </div>
        )
    }
};

export default Core;
