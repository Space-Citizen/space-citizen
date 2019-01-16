import React, { Component } from 'react';
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
                <a className="col-12 button-menu-selected" href="/game/play">
                    <img className="button-menu-image" src="/images/launch.jpg" alt="hangar" />
                    <div className="button-menu-text font-weight-bold">Take Off</div>
                </a>
                <a className="col-12 button-menu" href="/game/hangar">
                    <img className="button-menu-image" src="/images/hangar.jpg" alt="hangar" />
                    <div className="button-menu-text font-weight-bold">Hangar</div>
                </a>
                <a className="col-12 button-menu" href="/game/shop">
                    <img className="button-menu-image" src="/images/shop.jpg" alt="shop" />
                    <div className="button-menu-text font-weight-bold">Shop</div>
                </a>
            </div>
        );
    }
};

export default Leftnav;
