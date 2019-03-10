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
            usedShip: undefined
        };
    }
    componentDidMount() {
        get("/api/me/usedship").then(response => {
            this.setState({ usedShip: response.data });
        }).catch(error => {
            this.setState({ usedShip: -1 });
        });
    }

    displayTakeOffButton() {
        const { usedShip } = this.state;
        const gameUrl = (process.env.NODE_ENV === 'production' ? "/game/" : "localhost:12345/game/") + "?x-access-token=" + getToken();

        if (usedShip === undefined)
            return (<Loading />);

        if (usedShip === -1) {
            return (
                <a className="play-button-disabled"
                    target="_blank" rel="noopener noreferrer">
                    <div className="thumbnail-selected">
                        <img src="/images/launch.jpg" alt="launch" className="img-responsive leftnav-element-image" />
                        <div className="leftnav-element-text">
                            <label className="text-danger">No ship selected</label>
                        </div>
                    </div>
                </a>
            );
        }
        return (
            <a className="play-button"
                href={gameUrl}
                target="_blank" rel="noopener noreferrer">
                <div className="thumbnail-selected">
                    <img src="/images/launch.jpg" alt="launch" className="img-responsive leftnav-element-image" />
                    <div className="leftnav-element-text">
                        Take Off
            </div>
                </div>
            </a>);
    }

    render() {
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
                <Link className={"leftnav-element" + (document.location.toString().search("/shop") === -1 ? "" : "-selected")} to="/core/shop">
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
