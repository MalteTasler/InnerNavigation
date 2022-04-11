import React from "react";
import {Accordion, Input, AmountControl} from 'chayns-components'
import {Fetch} from '../actions/fetch.js';
import Map from './Map.js'
import Toolbar from "./Toolbar.js";
import Square from './Square.js'
import './AdminView.css'
import Point from './Point.js'
import ImageAccordion from "chayns-components/dist/cjs/react-chayns-image_accordion/component/ImageAccordion";
import List from "chayns-components/dist/cjs/react-chayns-list/component/List";
import ListItem from "chayns-components/dist/cjs/react-chayns-list/component/ListItem";
import RfidInput from "chayns-components/dist/cjs/react-chayns-rfid_input/component/RfidInput";
import SetupWizard from "chayns-components/dist/cjs/react-chayns-setupwizard/component/SetupWizard";
import { SetupWizardItem } from "chayns-components";
import Signature from "chayns-components/dist/cjs/react-chayns-signature/component/Signature";
import SliderButton from "chayns-components/dist/cjs/react-chayns-sliderbutton/component/SliderButton";
import VerificationIcon from "chayns-components/dist/cjs/react-chayns-verification_icon/component/VerificationIcon";
import ContextMenu from "chayns-components/dist/cjs/react-chayns-contextmenu/component/ContextMenu";
let string_local_settings_viewingPoints = "Erlebnis-Punkte"
let string_local_settings = "Einstellungen"
let string_local_settings_level = "Etagen"
let gotData = [[{positionX:4, positionY:3, name:'One'},{positionX:4, positionY:3, name:'One'}], [{positionX:4, positionY:3, name:'One'},{positionX:4, positionY:3, name:'One'}]]

//enums
let itemEnum = ["WC", "Feuerlöscher"]
class AdminView extends React.Component{
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
        /*gotData[itemEnum.indexOf("WC")].forEach((one) => {
            let y = one.positionY;
            let x = one.positionX;
            points.push(new Point(x,y, one.name, counter));
            pointsHTML[counter] = document.getElementById(("serverPoint_"+counter))
            counter++;
        })
        counter = 0;
        gotData[itemEnum.indexOf("WC")].forEach((one) => {
            pointsHTML[counter] = document.getElementById(("serverPoint_"+counter));
            pointsHTML[counter].onmousedown = function(event) { //  start the process
                // get ready to move: make an absolute and top z-index
                event.preventDefault();
                let chars = event.path[0].id
                let idSplitted = chars.split("_")
                let number = Number(idSplitted[1])
                pointsHTML[number].style.position = 'absolute';
                pointsHTML[number].style.zIndex = 1000;
                // move it from any existing parents directly to the body
                // to position it relative to the body
                document.body.append(pointsHTML[number]);
                // and put this absolutely positioned pointsHTML[0] under the pointer
                moveAt(event.pageX, event.pageY);
                // centers the pointsHTML[0] on the coordinates (pageX, pageY)
                function moveAt(pageX, pageY) {
                    console.log("move", pageX, pageY)
                    pointsHTML[number].style.left = pageX - pointsHTML[number].offsetWidth / 2 + 'px';
                    pointsHTML[number].style.top = pageY - pointsHTML[number].offsetHeight / 2 + 'px';
                }
                function onMouseMove(event) {
                    event.preventDefault();
                    moveAt(event.pageX, event.pageY);
                }
                //  move the pointOne on mousemove
                document.addEventListener('mousemove', onMouseMove);
                document.querySelector('html').addEventListener('mouseup', function (e) {
                    console.log("mouseup");
                    let string = e.path[0].id;
                    console.log(string)
                    document.removeEventListener('mousemove', onMouseMove);
                    document.getElementById("serverPoint_0").onmouseup = null;
                    savePoints()      
                });
                
                 };
            counter++;
        })*/
        return  <div className = "main"><h1>Orientierung</h1>
                    <Accordion head={string_local_settings + ""}>
                        <Accordion head={string_local_settings_level+""}>
                            <div className ="settingsLevelFrame">
                                <AmountControl buttonText="Text" showInput={true}/>
                            </div>
                        </Accordion>
                        <Accordion head={string_local_settings_viewingPoints}>
                            <div className="settingsViewingPointsFrame">
                                Erlebnis-Punkte kannst Du über die Toolbar hinzufügen.
                            </div>
                        </Accordion>
                    </Accordion >
                    <Map adminMode = {true} horizontalAmount={27} verticalAmount={18}/> 
                    <ImageAccordion />
                    <List>
                        <ListItem title = {"Identification"}/>
                        <ListItem title = {"Identification"}/>
                        <ListItem title = {"Identification"}/>
                    </List>
                    <RfidInput value = {"Letter"} onInput = {() => {}} onConfirm = {() => {}}/>
                    {/*<SetupWizard>
                        <SetupWizardItem step = {1} title={"One"}></SetupWizardItem>
                        <SetupWizardItem step = {2} title={"Two"}></SetupWizardItem>
                    </SetupWizard>*/}
                    <Signature />
                    <ContextMenu itms ={[{className: "string", onClick:{}, text: "next", stringName: "class", icon: "image"},{className: "string", onClick:{}, text: "next", stringName: "class", icon: "image"}]} />
                    <SliderButton />
                    <VerificationIcon name = {"table"}/> 
                </div>
    }
}
export default AdminView