import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getToken } from '../../misc/token';
import "../css/leftnav.css"

class Leftnav extends Component {
    render() {
        return (
            <div className="col-12">
                <a className="col-12 play-button" href={"http://localhost:12345/?x-access-token=" + getToken()} target="_blank" rel="noopener noreferrer">
                    <img className="button-menu-image" src="/images/launch.jpg" alt="launch" />
                    <div className="button-menu-text font-weight-bold">Take Off</div>
                </a>
                <Link className={"col-12 button-menu" + (document.location.toString().search("/hangar") === -1 ? "" : "-selected")} to="/game/hangar">
                    <img className="button-menu-image" src="/images/hangar.jpg" alt="hangar" />
                    <div className="button-menu-text font-weight-bold">Hangar</div>
                </Link>
                <Link className={"col-12 button-menu" + (document.location.toString().search("/shop") === -1 ? "" : "-selected")} to="/game/shop">
                    <img className="button-menu-image" src="/images/shop.jpg" alt="shop" />
                    <div className="button-menu-text font-weight-bold">Shop</div>
                </Link>
            </div>
        );
    }
};

export default Leftnav;
