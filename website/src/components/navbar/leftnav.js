import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../css/leftnav.css"

class Leftnav extends Component {
    constructor() {
        super();
        this.state = {
        }
    };

    componentDidMount() {
    }

    render() {
        return (
            <div className="col-12">
                <Link className="col-12 play-button" to="/game/play">
                    <img className="button-menu-image" src="/images/launch.jpg" alt="launch" />
                    <div className="button-menu-text font-weight-bold">Take Off</div>
                </Link>
                <Link className={"col-12 button-menu" + (document.location.toString().search("/hangar") === -1 ? "" : "-selected")} to="/hangar">
                    <img className="button-menu-image" src="/images/hangar.jpg" alt="hangar" />
                    <div className="button-menu-text font-weight-bold">Hangar</div>
                </Link>
                <Link className={"col-12 button-menu" + (document.location.toString().search("/shop") === -1 ? "" : "-selected")} to="/shop">
                    <img className="button-menu-image" src="/images/shop.jpg" alt="shop" />
                    <div className="button-menu-text font-weight-bold">Shop</div>
                </Link>
            </div>
        );
    }
};

export default Leftnav;
