import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getToken } from '../../misc/token';
import { get } from '../../misc/axios';
import Loading from '../misc/loading';
import UserPersonalInfo from './userPersonalInfo';
import "../css/leftnav.css"

class Leftnav extends Component {
    constructor() {
        super();
        this.state = {
            usedShip: undefined,
            onlineStatus: undefined
        };
        this.getOnlineStatus = this.getOnlineStatus.bind(this);
    }

    componentDidMount() {
        get("/api/me/usedship").then(response => {
            this.setState({ usedShip: response.data });
        }).catch(error => {
            this.setState({ usedShip: -1 });
        });
        this.getOnlineStatus();
        // Start an interval to check if the user is online or not every 2 seconds
        setInterval(this.getOnlineStatus, 2000);
    }

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

    displayTakeOffButton() {
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
            errorMessage = "Game is already started";

        // If no ship is used or the player is in game, disable the play button
        if (usedShip === -1 || onlineStatus === 1) {
            return (
                <div className="play-button-disabled"
                    rel="noopener noreferrer">
                    <div className="thumbnail-selected">
                        <img src="/images/launch.jpg" alt="launch" className="img-responsive leftnav-element-image" />
                        <div className="leftnav-element-text">
                            <label className="text-danger">{errorMessage}</label>
                        </div>
                    </div>
                </div>
            );
        }
        // If there is no problems, display the play button
        return (
            <a className="play-button"
                href={gameUrl}
                target="_blank" rel="noopener noreferrer"
                onClick={() => this.onPlayGame()}>
                <div className="thumbnail-selected">
                    <img src="/images/launch.jpg" alt="launch" className="img-responsive leftnav-element-image" />
                    <div className="leftnav-element-text">
                        Take Off
            </div>
                </div>
            </a>);
    }

    render() {
        // Get the current page selected
        const location = document.location.toString();
        const hangarSelected = (location.search('/hangar') === -1);
        const shopSelected = (location.search('/shop') === -1);

        return (
            <nav>
                {this.displayTakeOffButton()}
                <Link className="leftnav-element" to="/core/hangar">
                    <div className={"thumbnail" + (hangarSelected ? "" : "-selected")}>
                        <img src="/images/hangar.jpg" alt="hangar" className="img-responsive leftnav-element-image" />
                        <div className="leftnav-element-text">
                            Hangar
                        </div>
                    </div>
                </Link>
                <Link className={"leftnav-element"} to="/core/shop">
                    <div className={"thumbnail" + (shopSelected ? "" : "-selected")}>
                        <img src="/images/shop.jpg" alt="shop" className="img-responsive leftnav-element-image" />
                        <div className="leftnav-element-text">
                            Shop
                        </div>
                    </div>
                </Link>
                <div className="">
                    <UserPersonalInfo />
                </div>
            </nav>
        );
    }
};

export default Leftnav;
