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
        this.setState({authToken: localStorage.getItem("x-access-token")});
    }

    render() {
        return (
            <div>
                <div className="col-12 row navbar-container">
                    <div className="col-lg-3 col-sm-6 game-title-container">
                        <h2 className="font-weight-bold col-12 offset-1 game-title text-center"><a href="/game" className="game-title-link">Space Citizen</a></h2>
                    </div>
                    {/* <div className="col-6 navbar-element">
                        <button className="btn btn-success col-lg-10 offset-lg-1">
                            <i className="fas fa-space-shuttle fa-7x"></i>
                            <span className="navbar-element-btn"><br /><b>PLAY !</b></span>
                        </button>
                    </div> */}
                    <div className="col-lg-3 offset-lg-6 col-sm-6 navbar-element">
                        <a className="btn btn-secondary sign-in-btn col-lg-10 offset-lg-1" href="/signin">
                            <i className="fas fa-user-circle fa-3x"></i>
                            <span className="navbar-element-btn"><br />Sign in</span>
                        </a>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
};

export default Navbar;
