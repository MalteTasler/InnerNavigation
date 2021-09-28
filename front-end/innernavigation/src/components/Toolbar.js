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
        this.state = {onModeChange: properties.onModeChange, adminMode: properties.adminMode}
    }
    focus = (data) => {
        let modeEnum = ["wallToolsFrame", "elementToolsFrame", "undoRedoToolsFrame"]

        document.querySelectorAll(".tool").forEach((item) => {
            item.style.borderBottom = "";
        })
        let focus = data.target.id;
        let above = data.target.parentNode.parentNode.id;
        let mode =modeEnum.indexOf(above);
        this.state.onModeChange(mode)
        document.getElementById(focus).style.borderBottom = "4px solid #5555DD"
        console.log(focus, above, modeEnum.indexOf(above))

        switch(data.target.id)
        {
            case 'zoomIn':
                
        }
    }
    render() {
        return  <div className="toolbarMain">
                    {this.state.adminMode 
                    ? 
                    <div className="toolsFrame" id = "toolsFrameEdit">
                        <div className="toolCategoryFrame" id="undoRedoToolsFrame">
                            <div className="toolFrame" id ="levelUp" onClick= {(data) => {this.focus(data)}}></div>
                        </div>
                        <div className="toolCategoryFrame" id="wallToolsFrame">
                            <div className="toolFrame" id="wallPainterFrame">
                                <div className="tool" id = "wallPainter" onClick = {(data) => {this.focus(data)}}>Build</div>
                            </div>
                            <div className="toolFrame" id="wallEraserFrame">
                                <div className="tool" id = "wallEraser" onClick = {(data) => {this.focus(data)}}>Erase</div>
                            </div>
                        </div>
                        <div className="toolCategoryFrame" id="elementToolsFrame">
                            <div className="toolFrame" id="wcFrame">
                                <div className="tool" id = "wc" onClick= {(data) => {this.focus(data)}}>🚾</div>
                            </div>
                        </div>
                    </div>
                    :'' 
                    }
                    <div className="toolsFrame" id = "toolsFrameNavigation">
                        <div className="toolCategoryFrame" id="zoomNavigationFrame">
                            <div className="toolFrame" id= "zoomInFrame">
                                <div className="tool" id = "zoomIn" onClick = {(data) => {this.focus(data)}}>+</div>
                            </div>
                            <div className="toolFrame" id= "zoomOutFrame">
                                <div className="tool" id = "zoomOut" onClick = {(data) => {this.focus(data)}}>-</div>
                            </div>
                        </div>
                    </div>
                </div>
    }
}
export default Toolbar