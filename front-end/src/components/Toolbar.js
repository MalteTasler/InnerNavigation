import React from "react";
import {Fetch} from '../actions/fetch.js';
import Square from './Square.js'
import './AdminView.css'
import Point from './Point.js'
import Map from './Map.js'

class Toolbar extends React.Component{
    constructor(properties)
    {
        super(properties)
        this.state = {onModeChange: properties.onModeChange, onLevelChange: properties.onLevelChange, adminMode: properties.adminMode}
    }
    focus = (data) => {
        let modeEnum = ["undo", "redo", "wallPainter", "wallEraser", "wc", "zoomIn", "zoomOut", "levelUp", "levelDown"]

        document.querySelectorAll(".put").forEach((item) => {
            item.style.borderBottom = "";
        })
        let focus = data;
        let above = document.getElementById(data).parentNode.parentNode.id;
        let mode =modeEnum.indexOf(data);
        this.state.onModeChange(mode)
        if(document.getElementById(focus).classList.contains("put")) document.getElementById(focus).style.borderBottom = "4px solid #5555DD"
        console.log(document.getElementById(focus).classList, focus, above, modeEnum.indexOf(above))

        switch(data)
        {
            case 'zoomIn':
                break;
            case 'zoomOut' :
                console.log("zoom out")
                break;
            case 'levelUp' :
                this.state.onLevelChange("plus")
                break;
            case 'levelDown' :
                this.state.onLevelChange("minus")
                break;
            case 'undo' :
                break;
            case 'redo' :
                break;
            case 'wallPainter':
                break;
            case 'wallEraser':
                break;
        }
    }
    componentDidMount() {
        this.state.adminMode ? this.focus("wallPainter") : "" ;
    }
    render() {
        return  <div className="toolbarMain">
                    {this.state.adminMode 
                    ? 
                    <div className="toolsFrame" id = "toolsFrameEdit">
                        <div className="toolCategoryFrame" id="undoRedoToolsFrame">
                            <div className="toolFrame" id ="undoFrame">
                                <div className="tool clicker" id="undo" onClick= {(data) => {this.focus(data.target.id)}}>↩</div>
                            </div>
                            <div className="toolFrame" id ="redoFrame">
                                <div className="tool clicker" id="redo" onClick= {(data) => {this.focus(data.target.id)}}>-</div>
                            </div>
                        </div>
                        <div className="toolCategoryFrame" id="wallToolsFrame">
                            <div className="toolFrame" id="wallPainterFrame">
                                <div className="tool put" id = "wallPainter" onClick = {(data) => {this.focus(data.target.id)}}>Build</div>
                            </div>
                            <div className="toolFrame" id="wallEraserFrame">
                                <div className="tool put" id = "wallEraser" onClick = {(data) => {this.focus(data.target.id)}}>Erase</div>
                            </div>
                        </div>
                        <div className="toolCategoryFrame" id="elementToolsFrame">
                            <div className="toolFrame" id="wcFrame">
                                <div className="tool put" id = "wc" onClick= {(data) => {this.focus(data.target.id)}}>🚾</div>
                            </div>
                        </div>
                    </div>
                    :<div></div>
                    }
                    <div className="toolsFrame" id = "toolsFrameNavigation">
                        <div className="toolCategoryFrame" id="zoomNavigationFrame">
                            <div className="toolFrame" id= "zoomInFrame">
                                <div className="tool clicker" id = "zoomIn" onClick = {(data) => {this.focus(data.target.id)}}>+</div>
                            </div>
                            <div className="toolFrame" id= "zoomOutFrame">
                                <div className="tool clicker" id = "zoomOut" onClick = {(data) => {this.focus(data.target.id)}}>-</div>
                            </div>
                        </div>
                        <div className="toolCategoryFrame" id="levelNavigationFrame">
                            <div className="toolFrame" id="levelUpFrame">
                            
                                <div className="tool clicker" id="levelUp" onClick= {(data) => {this.focus(data.target.id)}}>˄</div>
                            
                            </div>
                            <div className="toolFrame" id="levelDownFrame">
                                <div className="tool clicker" id="levelDown" onClick = {(data) => {this.focus(data.target.id)}}>˅</div>
                            </div>
                        </div>
                    </div>
                </div>
    }
}
export default Toolbar