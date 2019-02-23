import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { Link } from "react-router-dom";
import { getToken } from '../../misc/token';
import { get, post } from '../../misc/axios';
import { createNotification } from '../../misc/notification';
import '../css/messages.css';

class Messaging extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            searchResults: undefined,
            contact: undefined,
            contactList: undefined
        };
        if (process.env.NODE_ENV === 'production') {
            this.socketUrl = "https://35.235.82.216:4001";
        }
        else
            this.socketUrl = "http://localhost:4001";
        this.socket = openSocket(this.socketUrl, { secure: true });
        this.socket.on('message:authenticate:response', result => {
            if (result.error)
                createNotification("warning", result.error);
        });
        this.socket.on('message:send:response', result => {
            if (result.error) {
                createNotification("warning", result.error);
                return;
            }
            // get current messages
            var { messages } = this.state;
            // add date
            result.date = new Date();
            // add new message
            messages.push(result);
            // update
            this.setState({ messages: messages });

        });
        this.socket.on('message:receive', this.receiveMessage.bind(this));
        this.typingTimeout = 0;
    }

    componentDidMount() {
        this.socket.emit('message:authenticate', {
            token: getToken()
        });
        this.loadCurrentContactInformations();
        get('/api/messages/list_contacts').then(response => {
            this.setState({ contactList: response.data });
        });
        this.resetScrollBar();
    }

    resetScrollBar() {
        var objDiv = document.getElementById("messages-history");
        objDiv.scrollTop = objDiv.scrollHeight
    }

    componentDidUpdate() {
        this.loadCurrentContactInformations();
        this.resetScrollBar();
    }

    loadCurrentContactInformations() {
        const { contact } = this.state;

        var currentContactId = Number(this.getCurrentContactId());

        if (currentContactId >= 0 && ((contact && contact.id !== currentContactId) || (!contact))) {
            get('/api/users/profile_info/' + this.getCurrentContactId()).then(response => {
                this.setState({ contact: response.data });
            });
            get('/api/messages/get_messages_from/' + this.getCurrentContactId()).then(response => {
                this.setState({ messages: response.data });
            }).catch(error => {
                this.setState({ messages: undefined });
            });
        }
    }

    getCurrentContactId() {
        return (this.props.match.params.contactId);
    }

    receiveMessage(data) {
        // check if the message was received from the current contact
        if (data.sender_id !== Number(this.getCurrentContactId()))
            return;
        // get current messages
        var { messages } = this.state;
        // add date
        data.date = new Date();
        data.id = Math.floor(Math.random() * 100000);
        // add new message
        messages.push(data);
        // update
        this.setState({ messages: messages });
        console.log("got:", data);
    }

    sendMessage() {
        this.socket.emit('message:send', {
            token: getToken(),
            data: {
                message: document.getElementById("messageInput").value,
                receiver: Number(this.getCurrentContactId())
            }
        });
        document.getElementById("messageInput").value = "";
    }

    displayCurrentContact() {
        const { contact } = this.state;

        if (!contact)
            return (<div className="text-center"><i>Select a contact</i></div>);
        return (
            <div className="row">
                <img className="center-block col-10 offset-1" src={'/public/profile_pictures/' + contact.profile_picture} alt="avatar" />
                <Link className="text-center col-10 offset-1" to={'/profile/' + contact.id}>{contact.username}</Link>
            </div>
        );
    }

    displayContacts() {
        const { contactList } = this.state;

        if (!contactList)
            return;

        return (contactList.map(contact => {
            return (<Link className="text-center col-6" to={'/messages/' + contact.id} key={contact.id}>
                <div className={"col-12 messages-contact" + (contact.id === Number(this.getCurrentContactId()) ? "-selected" : "")}>
                    <img className="col-6" src={'/public/profile_pictures/' + contact.profile_picture} alt="avatar" />
                    <span>{contact.username}</span>
                </div>
            </Link >
            );
        }))
    }

    displayMessages() {
        if (!this.state.messages)
            return (<div style={{ color: "white" }}>No messages yet</div>);

        return this.state.messages.map(message => {
            // if i'm receiving the message
            if (message.sender_id === Number(this.props.match.params.contactId)) {
                return (
                    <div key={message.id} className="incoming_msg">
                        <div className={"received_msg"}>
                            <div className="received_withd_msg">
                                <p>{message.content}</p>
                                <span className="time_date">{new Date(message.date).toDateString() + " " + new Date(message.date).toLocaleTimeString()}</span></div>
                        </div>
                    </div>);
            }
            // if i'm sending it
            else {
                return (
                    <div className="outgoing_msg" key={message.id}>
                        <div className="sent_msg">
                            <p>{message.content}</p>
                            <span className="time_date">{new Date(message.date).toDateString() + " " + new Date(message.date).toLocaleTimeString()}</span></div>
                    </div>);
            }
        });
    }

    searchForUser(evt) {
        var searchText = evt.target.value; // this is the search text

        if (searchText.length === 0) {
            this.emptySearchResults();
            return;
        }
        if (this.typingTimeout)
            clearTimeout(this.typingTimeout);
        // send a request to the api after 700ms in order to don't send a request at each key stroke
        this.typingTimeout = setTimeout(() => {
            post('/api/messages/search_contact', { searchQuery: searchText }).then(result => {
                this.setState({ searchResults: result.data });
            });
        }, 700);
    }

    displaySearchResults() {
        const { searchResults } = this.state;
        var emptyResultsButton = document.getElementById("emptyResultsButton");

        if (!searchResults || !document.getElementById('search_user').value) {
            if (emptyResultsButton) {
                emptyResultsButton.style.visibility = "hidden";
            }
            return;
        }
        if (emptyResultsButton) {
            emptyResultsButton.style.visibility = "visible";
        }
        if (searchResults.length === 0)
            return (<div>No user found</div>);
        return (searchResults.map(user => {
            return (<div key={user.id} className="messages-contact-search-result text-center">
                <Link onClick={() => this.emptySearchResults()} to={"/messages/" + user.id}>{user.username}</Link>
            </div>);
        }));
    }

    emptySearchResults() {
        this.setState({ searchResults: undefined });
        document.getElementById('search_user').value = "";
    }

    checkIfEnterIsPressed(evt) {
        if (evt.key === "Enter")
            this.sendMessage();
    }

    render() {
        return (
            <div className="messages-container">
                <div className="row">
                    <div className="col-2 messages-contact-list-container">
                        <div>
                            {this.displayCurrentContact()}
                        </div>
                        <hr />
                        <div>
                            <h3 className="text-center">Contacts</h3>
                            <div className="col-12 form-group">
                                <input className="form-control" autoComplete="off" type="text" id="search_user" placeholder="Search a contact" onChange={(evt) => this.searchForUser(evt)} />
                            </div>
                            <div>
                                <div className="messages-contact-search-result-container">
                                    <button id="emptyResultsButton" className="messages-contact-search-empty-button float-right btn" onClick={() => this.emptySearchResults()}><i className="fas fa-times fa-xs"></i></button>
                                    {this.displaySearchResults()}
                                </div>
                                {this.displayContacts()}
                            </div>
                        </div>
                    </div>
                    <div className="col-10 inbox_msg messaging">
                        <div className="mesgs">
                            <div className="msg_history" id="messages-history">
                                {this.displayMessages()}
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input type="text" className="write_msg col-11" id="messageInput" placeholder="Type a message" onKeyPress={(evt) => this.checkIfEnterIsPressed(evt)} />
                                    <button className="msg_send_btn" type="button" onClick={() => this.sendMessage()}><i className="fas fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></div >
        );
    }
};
export default Messaging;
