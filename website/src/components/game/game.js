import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Navbar from '../navbar/navbar';
import Leftnav from '../navbar/leftnav';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            authToken: -1
        }
    };

    componentDidMount() {
        this.setState({ authToken: localStorage.getItem("x-access-token") });
    }

    render() {
        //display a loading screen during the loading of the token
        if (this.state.authToken === -1) {
            return (<p>Loading...</p>);
        }
        if (this.state.authToken === null) {
            console.log("token not found", this.token);
            return <Redirect to='/signIn' />
        }
        return (
            <div>
                <Navbar />
                <div>
                    <div className="col-3">
                        <Leftnav />
                    </div>
                    <div className="col-9">

                    </div>
                </div>
            </div>
        )
    }
};

export default Game;
