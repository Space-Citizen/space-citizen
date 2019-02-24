import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { get } from '../../misc/axios';
import { isConnected } from '../../misc/token';
import UserPersonalInfo from '../profile/userPersonalInfo';
import "../css/navbar.css";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            connected_user: undefined
        }
    };

    componentDidMount() {
        if (isConnected()) {
            get('/api/me/info').then(response => {
                this.setState({ connected_user: response.data });
            });
        }
    }

    logout() {
        localStorage.removeItem("x-access-token");
        document.location = "/";
    }

    displayProfileButton() {
        const { connected_user } = this.state;

        if (!connected_user)
            return;
        return (
            <div className="col-lg-2 col-md-4 col-sm-4 navbar-element">
                <div className="dropdown show col-12">
                    <button className="btn btn-secondary dropdown-toggle col-12" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="navbar-profile-container">
                            <i className="fas fa-address-card fa-3x col-3"></i>
                            <span className="col-7">{connected_user.username}</span>
                        </div>
                    </button>
                    <div className="dropdown-menu col-11" aria-labelledby="dropdownMenuLink">
                        <Link className="dropdown-item" to={"/profile/" + connected_user.id}>Profile</Link>
                        <Link className="dropdown-item" to="/messages">Messages</Link>
                        <button className="dropdown-item" onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        )
    }

    displayHomeButton() {
        return (
            <div className="col-lg-3 col-md-4 col-sm-4 core-title-container">
                <h2 className="font-weight-bold col-12 offset-1 core-title text-center"><Link to="/core" className="core-title-link">Space Citizen</Link></h2>
            </div>
        )
    }

    render() {
        // if user is not connected
        if (!isConnected()) {
            return (
                <div>
                    <div className="col-12 row navbar-container">
                        <div className="col-3 core-title-container">
                            <h2 className="font-weight-bold col-12 offset-1 core-title text-center">
                                <Link to="/" className="core-title-link">Space Citizen</Link>
                            </h2>
                        </div>
                        <div className="col-2 offset-7">
                            <Link className="btn btn-secondary col-lg-10 offset-lg-1" to="/signin">
                                <div className="navbar-profile-container">
                                    <div className="row">
                                        <i className="fas fa-address-card fa-2x col-3"></i>
                                        <span className="col-7 center-text">Sign in !</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <br />
                </div>
            );
        }

        return (
            <div>
                <div className="col-12 row navbar-container">
                    {this.displayHomeButton()}
                    <UserPersonalInfo />
                    {this.displayProfileButton()}
                </div>
                <br />
            </div>
        );
    }
};

export default Navbar;
