import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { get } from '../../misc/axios';
import Loading from '../misc/loading';
// import "../css/navbar.css";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            connected_user: undefined
        }
    };

    componentDidMount() {
        get('/api/me/info').then(response => {
            this.setState({ connected_user: response.data });
        });

    }

    logout() {
        localStorage.removeItem("x-access-token");
        document.location = "/";
    }

    render() {
        const { connected_user } = this.state;

        if (!connected_user)
            return (<Loading />);
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
                        <div className="dropdown show">
                            <button className="btn btn-secondary dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="far fa-2x fa-user-circle navbar-profile-btn-icon"></i>
                                <span className="navbar-profile-btn-text">{connected_user.username}</span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link className="dropdown-item" to={"/profile/" + connected_user.id}>Profile</Link>
                                <Link className="dropdown-item" to="/messages">Messages</Link>
                                <button className="dropdown-item" onClick={this.logout}>Logout</button>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav >
        );
    }
};

export default Navbar;
