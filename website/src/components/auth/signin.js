import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import axios from 'axios';
import '../css/signin.css';

class SignIn extends Component {

    handleSubmit(e) {
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;

        e.preventDefault();
        axios.post('/api/auth/signin', { email: email, password: password }).then(response => {
            if (!response || !response.data || !response.data.auth) {
                alert("Invalid password / email");
                return;
            }
            //store the token
            localStorage.setItem("x-access-token", response.data.token);
            document.location = "/";
        });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="loginPassword" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default SignIn;
