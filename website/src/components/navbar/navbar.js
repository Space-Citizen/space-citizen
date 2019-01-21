import React, { Component } from 'react';
import "../css/navbar.css";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            authToken: -1
        }
    };

    componentDidMount() {
        this.setState({ authToken: localStorage.getItem("x-access-token") });
    }

    logout() {
        localStorage.removeItem("x-access-token");
        document.location = "/";
    }

    displayUserInfo() {
        return (
            <div className="col-2 offset-5 user-info-box">
                <div className="float-right">
                    <div className="row">
                        <div className="col-6">
                            <i className="fas fa-money-bill"></i>
                            <span className="user-info-box-text">1500</span>
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
        if (!this.props.user) {
            return (
                <div className="col-2 navbar-element">
                    <a className="btn btn-secondary col-lg-10 offset-lg-1" href="/signin">
                        <div className="navbar-profile-container">
                            <div>
                                <i class="fas fa-address-card fa-3x col-3"></i>
                                <span className="col-7">Sign in !</span>
                            </div>
                        </div>
                    </a>
                </div>
            )
        }
        return (
            <div className="col-2 navbar-element">
                <div className="dropdown show col-12">
                    <button className="btn btn-secondary dropdown-toggle col-12" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="navbar-profile-container">
                            <i class="fas fa-address-card fa-3x col-3"></i>
                            <span className="col-7">{this.props.user.username}</span>
                        </div>
                    </button>
                    <div className="dropdown-menu col-11" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="/profile">Profile</a>
                        <button className="dropdown-item" onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        )
    }

    displayHomeButton() {
        if (!this.props.user) {
            return (
                <div className="col-3 game-title-container">
                    <h2 className="font-weight-bold col-12 offset-1 game-title text-center">
                        <a href="/" className="game-title-link">Space Citizen</a>
                    </h2>
                </div>
            )
        }
        return (
            <div className="col-3 game-title-container">
                <h2 className="font-weight-bold col-12 offset-1 game-title text-center"><a href="/game" className="game-title-link">Space Citizen</a></h2>
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
