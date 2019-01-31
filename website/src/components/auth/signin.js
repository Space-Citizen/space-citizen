import React, { Component } from 'react';
import { post } from '../../misc/axios';
import '../css/signin.css';

class SignIn extends Component {

    handleSubmit(e) {
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;

        e.preventDefault();
        post('/api/auth/signin', { email: email, password: password }).then(response => {
            //store the token
            localStorage.setItem("x-access-token", response.data.token);
            document.location = "/";
        });
    }

    render() {
        return (
            <div>
                <div className="container sign-in-form-container col-5">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Sign in</h2>
                        <div className="form-group">
                            <label htmlFor="loginEmail">Email address</label>
                            <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loginPassword">Password</label>
                            <input type="password" className="form-control" id="loginPassword" placeholder="Enter password" />
                        </div>
                        <p>Don't have an account ? <a href="/signup"><u>Click here !</u></a></p>
                        <button type="submit" className="btn btn-primary">Log in</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default SignIn;
