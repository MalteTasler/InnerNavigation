import React from "react";
import {Accordion, Input, AmountControl} from 'chayns-components'
import {Fetch} from '../actions/fetch.js';
import Square from './Square.js'
import Toolbar from "./Toolbar.js";
import AdminView from './AdminView.js'
import './AdminView.css'
import Point from './Point.js'

class Map extends React.Component{
    
    constructor(properties) {
        super(properties);
        this.state = {horizontalAmount: 27, mode: 3, superMode: 0, adminMode: properties.adminMode, zoomLevel: 4};
        
    }
    changeMode = (mode) =>{
        var modeEnum = ["undoRedoTool", "undoRedoTool", "wallTools", "wallTools", "elementTools"]
        var superModeEnum = ["wallTools", "elementTools"]
        console.log("mode is ",mode)
        this.setState({mode: mode, superMode: superModeEnum.indexOf(modeEnum[mode])})
        console.log("render parent ",this.state.mode)
    }
    superModeIs = () => {
        return this.state.superMode
    }
    zoomIn = () => {
        if(this.state.zoomLevel != 9)this.setState({zoomLevel: this.state.zoomLevel++})
    }
    render(){
        console.log("render parent ",this.state.mode)
        let squareObjects = [];
        for(let x = 0; x<486; x++)
        {
            squareObjects.push(<Square key= {"square"+x} mode={this.state.mode} superMode={ this.state.superMode} adminMode={this.state.adminMode} modeIs={() => this.superModeIs()} horizontalAmount = {this.state.horizontalAmount} x={x}/>)
        }
        return <div>{this.state.adminMode ? <Toolbar onModeChange = {(mode) => this.changeMode(mode)} adminMode = {true}/> : <Toolbar adminMode={false} />}
        <div className ="canvas">
        <div className = "squareCover">{squareObjects}</div>
        </div>
        </div>
    }
}
export default Map