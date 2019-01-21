import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import axios from 'axios';
import '../css/signup.css';

class SignUp extends Component {

    handleSubmit(e) {
        var username = document.getElementById("signupUsername").value;
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;
        var confirmPassword = document.getElementById("signupConfirmPassword").value;

        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill all the fields");
            return;
        }
        if (password !== confirmPassword)
        {
            alert("Passwords are different");
            return;
        }
        axios.post('/api/auth/signup', { email: email, password: password, username: username }).then(response => {
            if (!response || !response.data || !response.data.auth) {
                if (response.data.error)
                    alert("An error occured: " + response.data.error);
                else
                    alert("Error while creating the account");
                return;
            }
            //store the token
            localStorage.setItem("x-access-token", response.data.token);
            document.location = "/game";
        });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container sign-up-form-container">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Sign up</h2>
                        <div className="form-group">
                            <label htmlFor="signupUsername">Username</label>
                            <input type="text" className="form-control" id="signupUsername" placeholder="Enter username" />
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
