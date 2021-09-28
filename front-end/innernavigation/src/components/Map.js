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
        this.state = {mode: 0, adminMode: properties.adminMode, zoomLevel: 4};
    }
    changeMode = (mode) =>{
        console.log("mode is "+mode)
        this.setState({mode: mode})
    }
    modeIs = () => {
        return this.state.mode
    }
    zoomIn = () => {
        if(this.state.zoomLevel != 9)this.setState({zoomLevel: this.state.zoomLevel++})
    }
    render(){
        console.log("render parent "+this.state.mode)
        let squareObjects = [];
        for(let x = 0; x<36; x++)
        {
           
            squareObjects.push(<Square id= {"square"+x} mode={this.state.mode} modeIs={() => this.modeIs()} x={x}/>)
        }
        return <div>{this.state.adminMode ? <Toolbar onModeChange = {(mode) => this.changeMode(mode)} adminMode = {true}/> : <Toolbar adminMode={false} />}
        <div className ="canvas">
        <div className = "squareCover">{squareObjects}</div>
        </div>
        </div>
    }
}
export default Map