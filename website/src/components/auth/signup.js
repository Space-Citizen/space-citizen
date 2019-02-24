import React, { Component } from 'react';
import { post, get } from '../../misc/axios';
import { createNotification } from '../../misc/notification';
import '../css/signup.css';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            factions: undefined
        }
    }

    componentDidMount() {
        get('/api/factions/list').then(factions => {
            this.setState({ factions: factions.data });
        })
    }

    handleSubmit(e) {
        var username = document.getElementById("signupUsername").value;
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;
        var confirmPassword = document.getElementById("signupConfirmPassword").value;
        var faction = document.getElementById("signupFaction").value;

        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            createNotification("warning", "Please fill all the fields");
            return;
        }
        if (password !== confirmPassword) {
            createNotification("error", "Passwords are different");
            return;
        }
        post('/api/auth/signup', { email: email, password: password, username: username, faction: faction }).then(response => {
            //store the token
            localStorage.setItem("x-access-token", response.data.token);
            document.location = "/core";
        });
    }

    displayFactions() {
        const { factions } = this.state;

        if (!factions)
            return;
        return factions.map(faction => {
            return (<option key={faction.id} value={faction.id}>{faction.name}</option>);
        });

    }

    render() {
        return (
            <div>
                <div className="container sign-up-form-container">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Sign up</h2>
                        <div className="form-group">
                            <label htmlFor="signupUsername">Username</label>
                            <input type="text" className="form-control" id="signupUsername" placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupFaction">Faction</label>
                            <select id="signupFaction" className="form-control" defaultValue="2">
                                <option value="">Select your faction</option>
                                {this.displayFactions()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupEmail">Email address</label>
                            <input type="email" className="form-control" id="signupEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupPassword">Password</label>
                            <input type="password" className="form-control" id="signupPassword" placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupConfirmPassword">Confirm Password</label>
                            <input type="password" className="form-control" id="signupConfirmPassword" placeholder="Confirm password" />
                        </div>
                        <p>Already have an account ? <a href="/signin"><u>Click here !</u></a></p>
                        <button type="submit" className="btn btn-primary">Sign up !</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default SignUp;
