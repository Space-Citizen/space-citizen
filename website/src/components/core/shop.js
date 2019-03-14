import React, { Component } from 'react';
import { get, post } from '../../misc/axios';
import '../css/shop.css';
import { createNotification } from '../../misc/notification';

class Shop extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
    };

    componentDidMount() {
        get("/api/items/all").then(items => {
            this.setState({ items: items.data });
        });
    }

    buy(item) {
        post("/api/items/buy/" + item.id, []).then(response => {
            createNotification("success", response.data.success);

            // re-display user's money
            var userMoney = document.getElementById("user-info-money");
            if (!userMoney)
                return;
            userMoney.innerHTML = userMoney.innerHTML - item.price;
        });
    }

    displayItems() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Icon</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.items.map(item => {
                        return (
                            <tr key={item.id} className="shop-item">
                                <th scope="row"><img src={item.icon} className="shop-item-icon" alt={item.name} /></th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{JSON.parse(item.specifications).type}</td>
                                <td><button className="btn btn-warning" onClick={() => this.buy(item)}>Buy</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>);
    }

    render() {
        return (
            <div className="shop-container">
                <h1 className="text-center">Shop</h1>
                {this.displayItems()}
            </div>
        );
    }
};

export default Shop;
