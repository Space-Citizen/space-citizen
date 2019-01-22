import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "../css/navbar.css";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            connectedUser: []
        }
        this.token = localStorage.getItem("x-access-token");
    };

    componentDidMount() {
        axios.get('/api/me/info', { headers: { "x-access-token": this.token } }).then(response => {
            if (response.data.error) {
                if (document.location.toString().search("/game") >= 0) //redirect if not on signin page
                {
                    alert(response.data.error);
                    window.location = "/signin";
                }
                return;
            }
            this.setState({ connectedUser: response.data });
        });
    }

    isUserConnected() {
        if (!this.token || Object.keys(this.state.connectedUser).length === 0)
            return (false);
        return (true);
    }

    logout() {
        localStorage.removeItem("x-access-token");
        document.location = "/";
    }

    displayUserInfo() {
        const { connectedUser } = this.state;
        if (!this.isUserConnected())
            return;
        return (
            <div className="col-2 offset-5 user-info-box">
                <div className="float-right">
                    <div className="row">
                        <div className="col-6">
                            <i className="fas fa-money-bill"></i>
                            <span className="user-info-box-text">{connectedUser.money}</span>
                        </div>
                        <div className="col-6">
                            <div className="float-left">
                                <i className="fas fa-trophy"></i>
                                <span className="user-info-box-text">10</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <i className="fas fa-globe-americas"></i>
                            <span className="user-info-box-text">NA</span>
                        </div>
                        <div className="col-6">
                            <div className="float-left">
                                <i className="fas fa-user-friends"></i>
                                <span className="user-info-box-text">Earth</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    displayProfileButton() {
        const { connectedUser } = this.state;

        if (!this.isUserConnected()) {
            return (
                <div className="col-2 offset-7 navbar-element">
                    <Link className="btn btn-secondary col-lg-10 offset-lg-1" to="/signin">
                        <div className="navbar-profile-container">
                            <div>
                                <i className="fas fa-address-card fa-3x col-3"></i>
                                <span className="col-7">Sign in !</span>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        }
        return (
            <div className="col-2 navbar-element" >
                <div className="dropdown show col-12">
                    <button className="btn btn-secondary dropdown-toggle col-12" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="navbar-profile-container">
                            <i className="fas fa-address-card fa-3x col-3"></i>
                            <span className="col-7">{connectedUser.username}</span>
                        </div>
                    </button>
                    <div className="dropdown-menu col-11" aria-labelledby="dropdownMenuLink">
                        <Link className="dropdown-item" to="/profile">Profile</Link>
                        <button className="dropdown-item" onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        )
    }

    displayHomeButton() {
        if (!this.isUserConnected()) {
            return (
                <div className="col-3 game-title-container">
                    <h2 className="font-weight-bold col-12 offset-1 game-title text-center">
                        <Link to="/" className="game-title-link">Space Citizen</Link>
                    </h2>
                </div>
            )
        }
        return (
            <div className="col-3 game-title-container">
                <h2 className="font-weight-bold col-12 offset-1 game-title text-center"><Link to="/game" className="game-title-link">Space Citizen</Link></h2>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="col-12 row navbar-container">
                    {this.displayHomeButton()}
                    {this.displayUserInfo()}
                    {this.displayProfileButton()}
                </div>
                <br />
            </div>
        );
    }
};

export default Navbar;
