import React, { Component } from 'react';
import { get, post } from '../../misc/axios';
import { createNotification } from '../misc/notification';
import '../css/hangar.css'

class Marketplace extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: {},
      inventory: [],
      items: []
    };
    this.sellItem = this.sellItem.bind(this);
  }

  componentDidMount() {
    get("/api/me/inventory").then(response => {
      var inventory = [];
      response.data.forEach(element => {
        inventory.push(this.createItem(element));
      });
      this.setState({ inventory: inventory });
    });
    get('/api/marketplace').then(res => {
      this.setState({ items: res.data });
    });
  }

  createItem(item) {
    return ({
      id: item.id,
      item_type: JSON.parse(item.specifications).type,
      description: item.description,
      content:
        <div>
          <img className="hangar-inventory-item-image" src={item.icon} alt={item.name} />
          <div className="hangar-inventory-item-text">{item.name}</div>
        </div>
    })
  }

  sellItem(e) {
    e.preventDefault();
    var itemPrice = document.getElementById('sellPrice').value;
    itemPrice = Number(itemPrice);
    if (!Number.isInteger(itemPrice)) {
      createNotification('error', 'Price should be an integer', 'Wrong value');
      return;
    }
    post('/api/marketplace/' + this.currentItem.id, {
      price: itemPrice
    }).then(response => {
      window.location.reload();
    });
  }

  displayinventory() {
    return (
      <div className="hangar-inventory-container">
        {this.state.inventory.map((item) => {
          return (
            <div className="dropdown hangar-inventory-item" key={"inventory" + item.id} title={item.description}>
              <button className="btn btn-secondary" type="button" data-toggle="modal" data-target="#exampleModal"
                onClick={() => this.currentItem = item}>
                {item.content}
              </button>
            </div>
          );
        })
        }
      </div>
    );
  }

  buy(item) {
    post("/api/marketplace/buy/" + item.id, []).then(response => {
      createNotification("success", response.data.success);

      // re-display user's money
      var userMoney = document.getElementById("user-info-money");
      if (!userMoney)
        return;
      userMoney.innerHTML = userMoney.innerHTML - item.price;
      window.location.reload();
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

  modalContent(ep) {
    return (
      <div className="modal fade text-dark" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Sell this item</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="mt-0" onSubmit={this.sellItem}>
                <div className="form-group">
                  <label htmlFor="sellPrice">Price</label>
                  <input type="text" className="form-control" id="sellPrice" placeholder="Enter price" />
                </div>
                <button type="submit" className="btn btn-primary">Sell</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">Sell</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container text-light mt-3">
        <div className="row">
          <div className="col">
            <h2><i className="fas fa-store mr-2"></i>MarketPlace</h2>
            {this.displayinventory()}
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.displayItems()}
          </div>
        </div>


        {this.modalContent(this.currentItem)}

      </div>



    );
  }
}

export default Marketplace;
