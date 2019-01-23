import React, { Component } from 'react';
import { createNotification } from '../misc/notification';
import axios from 'axios';
import '../css/hangar.css';

class Hangar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      ships: [],
      selectedShip: {}
    };
    //used for auth
    this.token = localStorage.getItem("x-access-token");
    // equipments type available on the ships
    this.shipComponents = ["guns", "shields"];

    this.dragAuthorisations = [
      {
        source: "inventory", // drag source
        destination: "ship" + this.shipComponents[0], // drag destination
        item_type: this.shipComponents[0] // type of the item beeing dragged
      },
      {
        source: "inventory",
        destination: "ship" + this.shipComponents[1],
        item_type: this.shipComponents[1]
      },
      {
        source: "*",
        destination: "inventory",
        item_type: "*"
      }
    ];
  };

  componentDidMount() {
    // init states
    this.shipComponents.forEach(componentName => {
      this.setState({ ["ship" + componentName]: [] });
    });
    this.getUserInventory();
    axios.get("/api/me/ships", { headers: { "x-access-token": this.token } }).then(response => {
      this.setState({ ships: response.data });
    });
  }

  ////////////// mics JS functions //////////////

  getUserInventory() {
    //get all items
    axios.get("/api/me/inventory", { headers: { "x-access-token": this.token } }).then(response => {
      var inventory = [];
      response.data.forEach(element => {
        inventory.push(this.createItem(element));
      });
      this.setState({ inventory: inventory });
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
  getInventoryCapacity() {
    // to implement
    return (20);
  }

  getItemTypeCapacityOnShip(itemType) {
    // check if a ship is selected
    if (!this.isShipSelected())
      return (0);
    return (JSON.parse(this.state.selectedShip.specifications)[itemType + "_slots"]);
  }

  isShipSelected() {
    if (Object.keys(this.state.selectedShip).length === 0)
      return (false);
    return (true);
  }

  ////////////// Items movement functions //////////////

  // send item back to inventory
  resetItemToInventory(arraySourceName, itemId) {
    var { inventory } = this.state;
    var arraySource = this.state[arraySourceName]

    if (inventory.length + 1 > this.getInventoryCapacity()) {
      createNotification('warning', "Inventory is full");
      return;
    }
    // get item
    const itemToMove = arraySource.find(function (elem) { return (elem.id === itemId) });
    // remove item from current location
    arraySource.splice(arraySource.findIndex(function (elem) { return (elem.id === itemId) }), 1);
    // add item to inventory
    inventory.push(itemToMove);
    // update
    this.setState({ [arraySourceName]: arraySource, inventory: inventory });
  }

  //send item to ship
  addItemToShip(itemId) {
    var { inventory } = this.state;
    var item = inventory.find((e) => { return (e.id === itemId) });
    var itemIndexInInventory = inventory.findIndex((e) => { return (e.id === itemId) });

    if (!item)
      return;
    var shipDestination = this.dragAuthorisations.find(function (e) { return (e.item_type === item.item_type && e.source === "inventory") });
    var destArray = this.state[shipDestination.destination];

    if (destArray.length + 1 > this.getItemTypeCapacityOnShip(item.item_type)) {
      createNotification("warning", "Destination inventory is full");
      return;
    }
    inventory.splice(itemIndexInInventory, 1);

    destArray.push(item);
    this.setState({ inventory: inventory, [shipDestination.destination]: destArray });
  }

  ////////////// Buttons onclick functions //////////////

  saveChanges() {
    if (!this.isShipSelected()) {
      createNotification('error', "No ship selected");
      return;
    }
    var shipItemsId = [];
    var itemsToInventory = [];

    // items to add to the ship
    this.shipComponents.forEach(componentName => {
      this.state["ship" + componentName].forEach(item => {
        shipItemsId.push({ id: item.id });
      });
    });

    // items to add to the inventory
    this.state.inventory.forEach(item => {
      itemsToInventory.push({ id: item.id });
    });

    // edit ship equipment

    axios.post("/api/ships/edit", { shipId: this.state.selectedShip.id, itemsToShip: shipItemsId, itemsToInventory: itemsToInventory }, { headers: { "x-access-token": this.token } }).then(response => {
      if (response.data && response.data.error)
        createNotification('error', response.data.error);
      else if (response.data.success)
        createNotification('success', response.data.success);
    });
  }


  // swap between ships
  swapShip(newShipId) {
    var ship = this.state.ships.find(function (ship) { return (ship.id === newShipId) });
    var itemTypeToArray = [];

    //fill a table with each component's type and an array used to load them
    this.shipComponents.forEach(componentName => {
      itemTypeToArray.push({ itemType: componentName, array: [] });
    });

    // reload user's inventory
    this.getUserInventory();

    // get ship's inventory
    axios.get("/api/ships/inventory/" + newShipId, { headers: { "x-access-token": this.token } }).then(response => {
      if (response.data && response.data.error) {
        createNotification('error', response.data.error);
        return;
      }
      // for each item
      response.data.forEach(item => {
        if (!item.specifications)
          return;
        // find where to store the item
        var arrayToFill = itemTypeToArray.find(function (e) { return (e.itemType === JSON.parse(item.specifications).type) });
        if (!arrayToFill)
          return;
        // add the item
        arrayToFill.array.push(this.createItem(item));
      });
      // update the state arrays
      itemTypeToArray.forEach(e => {
        this.setState({ ["ship" + e.itemType]: e.array });
      });
      // update the selected ship
      this.setState({ selectedShip: ship });
    })
  }

  ////////////// display functions //////////////

  displayItemsPlaceholder(amount) {
    if (amount <= 0)
      return;
    var results = [];
    for (var i = 0; i < amount; i++) {
      results.push(
        <div key={"placeholder-" + i} className="hangar-item-placeholder">
        </div>
      );
    }
    return (results);
  }

  displayShipList() {
    var selectedShipId = -1;

    if (this.isShipSelected()) {
      selectedShipId = this.state.selectedShip.id;
    }
    return this.state.ships.map(ship => {
      return (
        <div key={ship.id} className={"hangar-ship" + (ship.id === selectedShipId ? " hangar-ship-selected" : "")}>
          <button onClick={() => this.swapShip(ship.id)}>
            <div>
              <img src={ship.icon} className="hangar-ship-icon" alt={ship.name} />
              <div className="hangar-ship-text">{ship.name}</div>
            </div>
          </button    >
        </div>
      );
    });
  }

  displayShipComponents() {
    if (!this.isShipSelected())
      return;
    return this.shipComponents.map(componentName => {
      return (
        <div key={componentName}>
          <h2 className="text-center hangar-ship-inventory-title">Ship's {componentName}</h2>
          <div className="hangar-ship-inventory-container">
            <div className="hangar-item-placeholder-container">
              {this.displayItemsPlaceholder(JSON.parse(this.state.selectedShip.specifications)[componentName + "_slots"])}
            </div>
            {this.state["ship" + componentName].map((item) => (
              <div key={componentName + item.id}>
                <div className="hangar-inventory-item"
                  onClick={() => this.resetItemToInventory("ship" + componentName, item.id)}>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div >);
    });
  }

  displayinventory() {
    return (
      <div className="hangar-inventory-container">
        {this.state.inventory.map((item) => (
          <div
            key={"inventory" + item.id}
            className="hangar-inventory-item"
            title={item.description}
            onClick={() => this.addItemToShip(item.id)}
          >
            {item.content}
          </div>
        ))}
      </div>);
  }

  //////////////

  render() {
    return (
      <div>
        <div className="hangar-container">
          <h1 className="hangar-title text-center">Hangar</h1>
          <div>
            <h2 className="text-center text-white">Your ships</h2>
            <div className="hangar-ship-container">
              {this.displayShipList()}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-8 ship-inventory">
              <div>
                {this.displayShipComponents()}
              </div>
            </div>
            <div className="col-4 hangar-inventory">
              <h2 className="text-center">Inventory</h2>
              {this.displayinventory()}
            </div>
          </div>
          <button className="btn btn-primary offset-5" onClick={() => this.saveChanges()}>Save changes</button>
        </div>
      </div >
    );
  }
};

export default Hangar;
