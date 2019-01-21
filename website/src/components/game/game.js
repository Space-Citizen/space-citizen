import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Navbar from '../navbar/navbar';
import Leftnav from '../navbar/leftnav';
import axios from 'axios';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            authToken: -1,
            connectedUser: []
        }
    };

    componentDidMount() {
        var token = localStorage.getItem("x-access-token");
        this.setState({ authToken: token });
        axios.get('/api/me/info', { headers: { "x-access-token": token } }).then(response => {
            this.setState({ connectedUser: response.data });
        });
    }

    render() {
        //display a loading screen during the loading of the token
        if (this.state.authToken === -1) {
            return (<p>Loading...</p>);
        }
        if (this.state.authToken === null) {
            return <Redirect to='/signIn' />
        }
        return (
            <div>
                <Navbar user={this.state.connectedUser} />
                <div className="row">
                    <div className="col-3">
                        <Leftnav />
                    </div>
                    <div className="col-9">
                        {this.props.pageContent}
                    </div>
                </div>
            </div>
        )
    }
};

export default Game;
