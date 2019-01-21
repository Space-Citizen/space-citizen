import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Game from './game';
import axios from 'axios';
import '../css/hangar.css';

class Hangar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerInventory: [],
            shipInventory: []
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    };
    componentDidMount() {
        //get all items
        var token = localStorage.getItem("x-access-token");
        axios.get("api/me/inventory", { headers: { "x-access-token": token } }).then(response => {
            var { playerInventory } = this.state;
            response.data.forEach(element => {
                playerInventory.push(
                    {
                        id: element.id,
                        content:
                            <div>
                                <img className="hangar-inventory-item-image" src={element.icon} alt="space gun" />
                                <div className="hangar-inventory-item-text">{element.name}</div>
                            </div>
                    }
                )
            });
            this.setState({ playerInventory: playerInventory });
        });
    }

    onDragEnd(result) {
        // dropped outside the list
        const { source, destination } = result;
        var { shipInventory, playerInventory } = this.state;

        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            return;
        }
        // if item is removed from the player inventory
        if (destination.droppableId === "shipInventory") {
            const itemToMove = playerInventory[source.index];
            playerInventory.splice(source.index, 1);
            shipInventory.push(itemToMove);
        }
        //if item is remove from the ship inventory
        else {
            const itemToMove = shipInventory[source.index];
            shipInventory.splice(source.index, 1);
            playerInventory.push(itemToMove);
        }
        this.setState({ shipInventory: shipInventory, playerInventory: playerInventory });
    }

    displayShipInventory() {
        return (
            <Droppable droppableId="shipInventory">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} className="hangar-ship-inventory-container">
                        {this.state.shipInventory.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="hangar-inventory-item"
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );

    }

    displayInventory() {
        return (
            <Droppable droppableId="playerInventory">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} className="hangar-inventory-container">
                        {this.state.playerInventory.map((item, index) => (
                            < Draggable key={index} draggableId={item.id} index={index} >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="hangar-inventory-item"
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )
                }
            </Droppable>);
    }

    displayPageContent() {
        return (
            <div>
                <div className="hangar-container">
                    <h1 className="hangar-title text-center">Hangar</h1>
                    <div className="row">
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <div className="col-8">
                                {this.displayShipInventory()}
                            </div>
                            <div className="col-4 hangar-inventory">
                                <h2 className="text-center">Inventory</h2>
                                {this.displayInventory()}
                            </div>
                        </DragDropContext>
                    </div>
                </div >
            </div >
        );
    }

    render() {
        return (<Game pageContent={this.displayPageContent()} />);
    }
};

export default Hangar;
