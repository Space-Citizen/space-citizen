import React, { Component } from 'react';
import { createNotification } from '../../misc/notification';
import { get, post } from '../../misc/axios';
import ReactTooltip from 'react-tooltip'
import '../css/hangar.css';

class Hangar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      ships: [],
      selectedShip: undefined,
      usedShip: undefined
    };
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
    get("/api/me/ships").then(response => {
      this.setState({ ships: response.data });
      if (response.data.length > 0)
        this.loadUsedShip();
    });
  }


  ////////////// Load functions    //////////////

  loadUsedShip() {
    get("/api/me/usedship").then(response => {
      this.setState({ usedShip: response.data });
    });
  }

  ////////////// mics JS functions //////////////

  getUserInventory() {
    //get all items
    get("/api/me/inventory").then(response => {
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

  getItemTypeCapacityOnShip(itemType) {
    const { selectedShip } = this.state;
    // check if a ship is selected
    if (!selectedShip)
      return (0);
    return (JSON.parse(selectedShip.specifications)[itemType + "_slots"]);
  }

  ////////////// Items movement functions //////////////

  // send item back to inventory
  resetItemToInventory(arraySourceName, itemId) {
    var { inventory } = this.state;
    var arraySource = this.state[arraySourceName]

    // get item
    const itemToMove = arraySource.find(function (elem) { return (elem.id === itemId) });
    // remove item from current location
    arraySource.splice(arraySource.findIndex(function (elem) { return (elem.id === itemId) }), 1);
    // add item to inventory
    inventory.push(itemToMove);
    // update
    inventory.sort(function (a, b) {
      if (a.item_type < b.item_type) { return -1; }
      if (a.item_type > b.item_type) { return 1; }
      return 0;
    });
    this.setState({ [arraySourceName]: arraySource, inventory: inventory });
  }

  //send item to ship
  addItemToShip(itemId) {
    var { inventory, selectedShip } = this.state;
    var item = inventory.find((e) => { return (e.id === itemId) });
    var itemIndexInInventory = inventory.findIndex((e) => { return (e.id === itemId) });

    if (!selectedShip) {
      createNotification('error', "No ship selected");
      return;
    }

    if (!item)
      return;
    var shipDestination = this.dragAuthorisations.find(function (e) { return (e.item_type === item.item_type && e.source === "inventory") });
    var destArray = this.state[shipDestination.destination];

    if (destArray.length + 1 > this.getItemTypeCapacityOnShip(item.item_type)) {
      createNotification("warning", "Ship's inventory is full");
      return;
    }
    inventory.splice(itemIndexInInventory, 1);

    destArray.push(item);
    this.setState({ inventory: inventory, [shipDestination.destination]: destArray });
  }

  ////////////// Buttons onclick functions //////////////

  saveChanges() {
    const { selectedShip } = this.state;

    if (!selectedShip) {
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

    post("/api/ships/edit", { shipId: selectedShip.id, itemsToShip: shipItemsId, itemsToInventory: itemsToInventory }).then(response => {
      createNotification('success', response.data.success);
    });
  }

  changeCurrentShip() {
    const { selectedShip } = this.state;

    if (!selectedShip) {
      createNotification('error', "No ship selected");
      return;
    }
    post("/api/me/changeship", { shipId: selectedShip.id }).then(response => {
      createNotification('success', response.data.success);
      this.loadUsedShip();
      window.location.reload();
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
    get("/api/ships/inventory/" + newShipId).then(response => {
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

  sellItem(itemId) {
    var { inventory } = this.state;

    post('/api/items/sell/' + itemId, []).then((response) => {
      createNotification('success', response.data.success);
      var itemToRemoveIndex = inventory.findIndex(i => { return (i.id === itemId) });
      if (itemToRemoveIndex) {
        inventory.splice(itemToRemoveIndex, 1);
        this.setState({ inventory: inventory });
      }
    });
  }

  sellShip(shipId) {
    post('/api/ships/sell/' + shipId, []).then(response => {
      createNotification("success", response.data.success);
      window.location.reload();
    });
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
    const { selectedShip, usedShip } = this.state;

    return this.state.ships.map(ship => {
      return (
        <div key={ship.id} className={
          "hangar-ship"
          + (selectedShip && ship.id === selectedShip.id ? " hangar-ship-selected" : "")
        }>
          <button onClick={() => this.swapShip(ship.id)}>
            <div>
              <img src={ship.icon} className="hangar-ship-icon" alt={ship.name} />
              <div className="hangar-ship-text">
                {ship.name}<br />
                <label className={(usedShip && ship.id === usedShip.id ? "hangar-ship-used" : "hangar-ship-not-used")}>Current Ship</label>
              </div>
            </div>
          </button>
        </div>
      );
    });
  }

  displayShipComponents() {
    const { selectedShip } = this.state;

    if (!selectedShip)
      return;
    return this.shipComponents.map(componentName => {
      return (
        <div key={componentName}>
          <h2 className="text-center hangar-ship-inventory-title">Ship's {componentName}</h2>
          <div className="hangar-ship-inventory-container">
            <div className="hangar-item-placeholder-container">
              {this.displayItemsPlaceholder(JSON.parse(selectedShip.specifications)[componentName + "_slots"])}
            </div>
            {this.state["ship" + componentName].map((item) => (
              <div key={componentName + item.id} className="hangar-ship-item-container">
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
        {this.state.inventory.map((item) => {
          return (
            <div className="dropdown hangar-inventory-item" key={"inventory" + item.id} title={item.description}>
              <button className="btn btn-secondary" type="button"
                onClick={() => this.addItemToShip(item.id)} onContextMenu={(e) => { e.preventDefault(); this.sellItem(item.id) }}>
                {item.content}
              </button>
            </div>
          );
        })
        }
      </div>);
  }

  displayShipActionsButtons() {
    const { selectedShip } = this.state;

    if (!selectedShip)
      return;
    return (
      <div className="col-6">
        <button className="btn btn-primary hangar-button" onClick={() => this.saveChanges()}><i className="fas fa-save"></i> Save changes</button>
        <button className="btn btn-success hangar-button" onClick={() => this.changeCurrentShip()}><i className="fas fa-warehouse"></i> Use this ship</button>
        <button className="btn btn-warning hangar-button" onClick={() => this.sellShip(selectedShip.id)}><i className="fas fa-dollar-sign"></i> Sell this ship</button>
      </div>
    );
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
            <br />
          </div>
          {this.displayShipActionsButtons()}
          <div className="row">
            <div className="col-8 ship-inventory">
              <div>
                {this.displayShipComponents()}
              </div>
            </div>
            <div className="col-4 hangar-inventory">
              <h2 className="text-center">Inventory <i className="fas fa-question-circle"
                data-html={true} data-tip='<label style="font-size:17px;"><b>Left</b> click to move an item to the ship.<br/><b>Right</b> click to sell it</label>'></i></h2>
              {this.displayinventory()}
              <ReactTooltip />
            </div>
          </div>
        </div>
      </div >
    );
  }
};

export default Hangar;
