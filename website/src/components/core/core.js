import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { get } from '../../misc/axios';
import Leftnav from '../navbar/leftnav';
import Hangar from './hangar';
import Shop from './shop';
import { isConnected } from '../../misc/token';
import Profile from './profile/profile';
import Loading from '../misc/loading';
import CoreHome from './coreHome';
import Messages from './messages/messaging';
import Marketplace from '../../components/marketplace/marketplace';
import '../css/core.css';

class Core extends Component {
    constructor() {
        super();
        this.state = {
            connectedUser: undefined
        };
    };

    componentDidMount() {
        get('/api/users/private_info').then(response => {
            this.setState({ connectedUser: response.data });
        });
    }

    render() {
        const { connectedUser } = this.state;
        //display a loading screen during the loading of the token
        if (!isConnected()) {
            return <Redirect to='/signIn' />
        }
        // display a loading message while getting the user's informations
        if (!connectedUser) {
            return (<Loading />);
        }

        return (
            <div className="core-container">
                <div className="row">
                    <div className="col-2 core-leftnav-container">
                        <Leftnav />
                    </div>
                    <div className="col-10">
                        <Route exact path="/core/" render={(props) => <CoreHome {...props} connectedUser={connectedUser} />} />
                        <Route path="/core/hangar" render={(props) => <Hangar {...props} connectedUser={connectedUser} />} />
                        <Route path="/core/shop" render={(props) => <Shop {...props} connectedUser={connectedUser} />} />
                        <Route path="/core/profile" render={(props) => <Profile {...props} connectedUser={connectedUser} />} />
                        <Route path="/core/marketplace" render={(props) => <Marketplace {...props} connectedUser={connectedUser} />} />
                        <Route path="/core/messages/:contactId?" component={Messages} />
                    </div>
                </div>
            </div>
        )
    }
};

export default Core;
