import React, { Component } from 'react';
import { Link } from "react-router-dom";
import UserPersonalInfo from './userPersonalInfo';
import "../css/leftnav.css"

class Leftnav extends Component {

    render() {
        // Get the current page selected
        const location = document.location.toString();
        const hangarSelected = (location.search('/hangar') === -1);
        const shopSelected = (location.search('/shop') === -1);
        const profileSelected = (location.search('/profile') === -1);

        return (
            <nav>
                <Link className={"leftnav-element"} to="/core/profile">
                    <div className={"thumbnail" + (profileSelected ? "" : "-selected")}>
                        <img src="/images/bedroom.jpg" alt="profile" className="img-responsive leftnav-element-image" />
                        <div className="leftnav-element-text">
                            Profile
                        </div>
                    </div>
                </Link>
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
                <Link to="/core/messages" className="btn btn-primary w-100">
                    <i className="fas fa-comments mr-1"></i>
                    Messaging
                </Link>
                <div>
                    <UserPersonalInfo />
                </div>
            </nav>
        );
    }
};

export default Leftnav;
