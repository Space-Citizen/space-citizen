import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getToken } from '../../misc/token';
import "../css/leftnav.css"

class Leftnav extends Component {
    render() {
        return (
            <div className="col-12">
                <a className="col-12 play-button" href={(process.env.NODE_ENV === 'production' ? "/game/" : "localhost:12345/game/") + "?x-access-token=" + getToken()} target="_blank" rel="noopener noreferrer">
                    <img className="button-menu-image" src="/images/launch.jpg" alt="launch" />
                    <div className="button-menu-text font-weight-bold">Take Off</div>
                </a>
                <Link className={"col-12 button-menu" + (document.location.toString().search("/hangar") === -1 ? "" : "-selected")} to="/core/hangar">
                    <img className="button-menu-image" src="/images/hangar.jpg" alt="hangar" />
                    <div className="button-menu-text font-weight-bold">Hangar</div>
                </Link>
                <Link className={"col-12 button-menu" + (document.location.toString().search("/shop") === -1 ? "" : "-selected")} to="/core/shop">
                    <img className="button-menu-image" src="/images/shop.jpg" alt="shop" />
                    <div className="button-menu-text font-weight-bold">Shop</div>
                </Link>
            </div>
        );
    }
};

export default Leftnav;
