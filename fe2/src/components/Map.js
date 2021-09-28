import React from "react";
import {Accordion, Input, AmountControl} from 'chayns-components'
import {Fetch} from '../actions/fetch.js';
import Square from './Square.js'
import Toolbar from "./Toolbar.js";
import AdminView from './AdminView.js'
import './AdminView.css'
import Point from './Point.js'

class Map extends React.Component{
    modeEnum = ["wallTools", "elementTools", "undoRedoTools"]
    constructor(properties) {
        super(properties);
        this.state = {mode: 0};
    }
    changeMode = (mode) =>{
        console.log("mode is "+mode)
        this.setState({mode: mode})
    }
    modeIs = () => {
        return this.state.mode
    }
    render(){
        console.log("render parent "+this.state.mode)
        let squareObjects = [];
        for(let i = 0; i<224; i++)
        {
            squareObjects.push(<Square mode={this.state.mode} modeIs={() => this.modeIs()}/>)
        }
        return <div><Toolbar onModeChange = {(mode) => this.changeMode(mode)}/>
        <div className ="canvas">
        <div className = "squareCover">{squareObjects}</div>
        </div>
        </div>
    }
}
export default Map