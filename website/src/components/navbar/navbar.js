import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { get } from '../../misc/axios';
import Loading from '../misc/loading';
import { getToken } from '../../misc/token';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            connected_user: undefined,
            onlineStatus: undefined,
            usedShip: undefined
        };
        this.getOnlineStatus = this.getOnlineStatus.bind(this);
    };

    componentDidMount() {
        get('/api/users/private_info').then(response => {
            this.setState({ connected_user: response.data });
        });
        get("/api/me/usedship").then(response => {
            this.setState({ usedShip: response.data });
        }).catch(error => {
            this.setState({ usedShip: -1 });
        });
        this.getOnlineStatus();
        // Start an interval to check if the user is online or not every 2 seconds
        setInterval(this.getOnlineStatus, 2000);
    }

    logout() {
        localStorage.removeItem("x-access-token");
        document.location = "/";
    }


    ///// Launch button /////

    // Get the user's online status
    getOnlineStatus() {
        get("/api/me/online_status").then(response => {
            // set the new status
            this.setState({ onlineStatus: response.data });
        });
    }
    // When the play game button is pressed
    onPlayGame() {
        // Set online status to online
        this.setState({ onlineStatus: 1 });
    }

    displayLaunchButton() {
        const { usedShip, onlineStatus } = this.state;
        // Get the game url
        const gameUrl = (process.env.NODE_ENV === 'production' ? "http://35.235.82.216:12345/game/" : "localhost:12345/game/") + "?x-access-token=" + getToken();

        // If loading
        if (usedShip === undefined || onlineStatus === undefined)
            return (<Loading />);

        // Get the error message to display
        var errorMessage = undefined;
        if (usedShip === -1)
            errorMessage = "No ship selected";
        else if (onlineStatus === 1)
            errorMessage = "Launch";

        // If no ship is used or the player is in game, disable the play button
        if (usedShip === -1 || onlineStatus === 1) {
            return (
                <span className="navbar-launch-text-disabled" disabled={true}>
                    {errorMessage}
                </span>
            );
        }
        // If there is no problems, display the play button
        return (
            <a className="navbar-launch-text" href={gameUrl}
                target="_blank" rel="noopener noreferrer"
                onClick={() => this.onPlayGame()}>
                Launch
            </a>
        );
    }

    render() {
        const { connected_user } = this.state;

        if (!connected_user)
            return (<Loading />);
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="mx-auto order-0">
                    <Link to="/" className="navbar-brand mx-auto">Space Citizen</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="mx-50">
                    <div className="navbar-launch">
                        {this.displayLaunchButton()}
                    </div>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <div className="dropdown show">
                            <button className="btn btn-secondary dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="far fa-2x fa-user-circle navbar-profile-btn-icon"></i>
                                <span className="navbar-profile-btn-text">{connected_user.username}</span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <button className="dropdown-item" onClick={this.logout}>Logout</button>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav >
        );
    }
};

export default Navbar;
