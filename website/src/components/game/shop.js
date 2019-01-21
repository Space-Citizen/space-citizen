import React, { Component } from 'react';
import Game from './game';
import axios from 'axios';
import '../css/shop.css';

class Shop extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
    };

    componentDidMount() {
        var token = localStorage.getItem("x-access-token");
        axios.get("/api/items/all", { headers: { "x-access-token": token } }).then(items => {
            this.setState({ items: items.data });
        });
    }

    displayItems() {
        var itemList = [];

        this.state.items.forEach(item => {
            itemList.push(
                <tr key={item.id}>
                    <th scope="row"><img src={item.icon} className="shop-item-icon" alt={item.name} /></th>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td><button className="btn btn-warning">Buy</button></td>
                </tr>
            );
        });
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Icon</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList}
                </tbody>
            </table>);
    }

    displayPageContent() {
        return (
            <div className="shop-container">
                <h1 style={{ color: "white" }} className="text-center">Shop</h1>
                {this.displayItems()}
            </div>
        );
    }

    render() {
        return (<Game pageContent={this.displayPageContent()} />);
    }
};

export default Shop;
