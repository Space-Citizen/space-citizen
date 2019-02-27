import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../css/navbar.css";

class NavbarLoggedOut extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="mx-auto order-0">
                    <Link to="/" className="navbar-brand mx-auto">Space Citizen</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <Link className="btn btn-dark" to="/signin">Sign in</Link>
                    </ul>
                </div>
            </nav >
        );
    }
};

export default NavbarLoggedOut;
