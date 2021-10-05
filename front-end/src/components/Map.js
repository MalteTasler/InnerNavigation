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
        this.state = {  horizontalAmount: 27, 
                        mode: 3, superMode: 0, 
                        adminMode: properties.adminMode, 
                        zoomLevel: 4, 
                        levelArray: [-1, 0, 1], 
                        level : 0,
                        isClickedTool:false,
                        clickedTool: {mode: 0, location:""} // 0 no action 1 clicked first time 2 hovered first time after click making it horicontylly 3 vertically
                    };
        
        
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

    changeLevel = (level) => {
        if(level == "plus")
        {
            if(this.state.levelArray.indexOf(this.state.level +1) != -1)
            {
                this.setState({level : this.state.level +1})
            }
        }
        else if(level == "minus"){
            if(this.state.levelArray.indexOf(this.state.level -1) != -1)
            {
                this.setState({level: this.state.level -1})
            }
        }
    }

    changeClickedTool = (data) => { //clicked with tool on the canvas
        //this.setState({clickedTool: data})
    }

    clickedSquare = (data, key) => {
        console.log("clicking",data.target.parentNode, this.state.clickedTool)
        let location = parseInt(key.split('_')[1])
        let y = Math.floor(location / this.state.horizontalAmount);
        let x = location % this.state.horizontalAmount;
        if(this.state.clickedTool.mode == 0)
        {
            this.setState({clickedTool: {mode: 1, location: {x: x, y:y}}})
            
        }
        else if(this.state.clickedTool.mode == 1)
        {
            this.setState({clickedTool:{mode : 0, location: {}}})
        }
        
    }

    hoveredSquare = (data, key) => {
        console.log("hovering", this.state.clickedTool.mode)
        if(this.state.clickedTool.mode == 1)
        {
            let location = parseInt(key.split('_')[1])
            let y = Math.floor(location / this.state.horizontalAmount);
            let x = location % this.state.horizontalAmount;
            console.log("hovered", x, y)
            if(this.state.clickedTool.location.x == x && this.state.clickedTool.location.y == y)
            {

            }
            else if(this.state.clickedTool.location.x == x) // horicontally
            {
                
            }
            else if(this.state.clickedTool.location.y == y) // vertically
            {

            }
            else //more
            {

            }

        }
    }

    shouldComponentUpdate(nextProps, nextState) { 
        console.log("next ", nextProps, nextState)
        if('clickedTool' in nextProps)
        {
            //console.log("clicked Tool ",nextProps.clickedTool)
            
            //return false;
        }
        if (nextState.clickedTool.mode != this.state.clickedTool.mode) return false
        return true
    }

    render(){
        //if(allowRender){
            console.log("render parent ",this.state.mode, chayns.env.site.colorScheme)
            let squareObjects = [];
            for(let x = 0; x<486; x++)
            {
                squareObjects.push(<Square  key= {"square_"+x}
                                            id= {"square_"+x}
                                            mode={this.state.mode}
                                            superMode={ this.state.superMode}
                                            adminMode={this.state.adminMode}
                                            modeIs={() => this.superModeIs()}
                                            clickedTool = {this.state.clickedTool}
                                            clickedSquare = {(data, id) => {this.clickedSquare(data, id)}}
                                            hoveredSquare = {(data, id) => {this.hoveredSquare(data, id)}}
                                            changeClickedTool = {() => {this.changeClickedTool()}}
                                            horizontalAmount = {this.state.horizontalAmount} x={x}/>)
            }
            return <div>{this.state.adminMode ? <Toolbar onModeChange = {(mode) => this.changeMode(mode)} adminMode = {true} onLevelChange = {(level) => this.changeLevel(level)}/> : <Toolbar adminMode={false} onLevelChange={(level) => this.changeLevel(level)}/>}
            
            <div className ="canvas">
                <div className = "squareCover">{squareObjects}</div>
            </div>
            <div className="levelDisplayFrame">
                <div className="levelDisplay">
                    Etage: {this.state.level}
                </div>
            </div>
            </div>
        //}
    }
}
export default Map