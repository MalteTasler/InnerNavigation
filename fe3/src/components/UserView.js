import React from "react";
import {Fetch} from '../actions/fetch.js';
import Map from './Map.js'
import './AdminView.css'

let string_local_settings_level = "Etagen"

let gotData = [[{positionX:4, positionY:3, name:'One'},{positionX:4, positionY:3, name:'One'}], [{positionX:4, positionY:3, name:'One'},{positionX:4, positionY:3, name:'One'}]]

//enums
let itemEnum = ["WC", "Feuerlöscher"]

class UserView extends React.Component{
    /*constructor(properties) {
        super(properties);
        this.state = {};
    }*/
    render(){
        try{
            Fetch.getData("base", function()
            {
                Fetch.getData("elements", function()
                {
                    
                }
                )
            }
            )
        }
        catch{
            console.log("failed looking for data");
        }
        let points = [];
        let pointsHTML = [];
        let counter=0;
        return  <div className = "main">
                    <h1>Orientierung</h1>
                    
                    <Map adminMode={false} /> 
                </div>
    }
}
export default UserView