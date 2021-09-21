import Item from './Item.js';
import HashTable from './HashTable.js';
import Point from './Point.js';

    let databaseURL = "http://localhost:5000";
    let token = "";
    let domain = ".tobit.ag";
    let devider = "-";
    let deviderPort = ":";
    let maximalX = 245;
    let maximalY = 22;
    let testMode = true;
    let staging = false;

    let pointOne;

        let width = "746px";
        let images = ["Campus1-2.png", "Campus1-2.png", "Campus1-2.png", "Campus3.png", "Campus4.png", "Campus5.png", "Campus6.png"]

        let htmlServerOptions = [   '<div class="serverNamesFrame"><div id= "',
                                    '_Server_Name_Frame"><input id = "',
                                    '_Server_Name" class="name" placeholder="server name" /><div id= "',
                                    '_Error_Server_Name" class="error hidden"></div></div><div id= "',
                                    '_Server_IPAddress_Frame"><input id= "',
                                    '_Server_IPAddress" class="name" placeholder="IP address" /><div id= "',
                                    '_Error_Server_IPAddress" class="error hidden"></div></div><div id= "',
                                    '_Server_SubnetMask_Frame"><input id= "',
                                    '_Server_SubnetMask" class="name" placeholder="Subnet Mask" /><div id= "',
                                    '_Error_Server_SubnetMask" class="error hidden"></div></div><div id="',
                                    '_Server_Network"></div></div><div id="',
                                    '_Server_Location_Frame">Location <select id="',
                                    '_Server_Location" class = "locationArray"></select><div id="',
                                    '_Error_Server_Location" class="error hidden"></div></div><div id ="',
                                    '_Server_IsVirtual_Frame" class="isSomethingFrame"><div class="rbFrame"><input type="radio" class = "rb" id="',
                                    '_Server_IsVirtual"/><div class="rbLabel">is virtual</div></div></div><div id ="',
                                    '_Server_HostName_Frame" class=" hidden">runs on <select id="',
                                    '_Server_HostName" class="serverArray"></select></div><button id = "',
                                    '_Server_Save" class="btSave">Save</button>' ];
        let htmlServiceOptions = [  '<div class="serviceNamesFrame"><div id= "',
                                    '_Service_Name_Frame"><input id = "',
                                    '_Service_Name" class="name" placeholder="service name" /><div id= "',
                                    '_Error_Service_Name" class="error hidden"></div></div><div id= "',
                                    '_Service_DisplayName_Frame"><input id = "',
                                    '_Service_DisplayName" class="name" placeholder="service display name" /><div id= "',
                                    '_Error_Service_DisplayName" class="error hidden"></div></div><div id= "',
                                    '_Service_RunsOn_Frame"><div id ="',
                                    '_Network_SubnetOff_Labelled" class="name" >runs on <select id= "',
                                    '_Service_RunsOn" class= "serverArray"></select></div><div id= "',
                                    '_Error_Service_RunsOn" class="error hidden"></div></div></div><button id = "',
                                    '_Service_Save" class="btSave">Save</button>'];
        let htmlCategoryOptions = [ '<div class="categoryNamesFrame"><div id= "',
                                    '_Category_Name_Frame"><input id = "',
                                    '_Category_Name" class="name" placeholder="category url name" /><div id= "',
                                    '_Error_Category_Name" class="error hidden"></div></div><div id= "',
                                    '_Category_DisplayName_Frame"><input id = "',
                                    '_Category_DisplayName" class="name" placeholder="category displayname" /><div id= "',
                                    '_Error_Category_DisplayName" class="error hidden"></div></div></div><div id ="',
                                    '_isHTTPFrame" class="isSomethingFrame"><div class="rbFrame"><input type="radio" class = "rb" id="',
                                    '_Category_HTTPS"/><div class="rbLabel">https</div><input type="radio" class= "rb" id="',
                                    '_Category_NoHTTPS" /><div class="rbLabel">http</div></div></div><div id= "',
                                    '_Category_Port_Frame"><div id = "',
                                    '_CategoryPortLabelled" class="name" >port number <input id = "',
                                    '_Category_Port" value = "443" /></div><div id= "',
                                    '_Error_Category_Port" class="error hidden"></div></div><button id= "',
                                    '_Category_Save" class="btSave">Save</button></div>'];
        let htmlNetworkOptions =  [ '<div class="networkNamesFrame"><div id= "',
                                    '_Network_Name_Frame"><input id = "',
                                    '_Network_Name" class="name" placeholder="network name" /><div id= "',
                                    '_Error_Network_Name" class="error hidden"></div></div></div><!--<div id ="',
                                    '_isSubnetFrame" class="isSomethingFrame"><div class="rbFrame"><input type="radio" class = "rb" id="',
                                    '_rbSubnet"/><div class="rbLabel"></div></div></div>--><div id= "',
                                    '_Network_SubnetOff_Frame">div id ="',
                                    '_Network_SubnetOff_Labelled" class="name" >part of network <select id="',
                                    '_Network_SubnetOff" class="networkArray"></select></div><div id= "',
                                    '_Error_Network_SubnetOff" class="error hidden"></div></div><button id = "',
                                    '_Network_Save" class="btSave">Save</button>'];
        let htmlLocationOptions = [ '<div class="locationNamesFrame"><div id= "',
                                    '_Location_Number_Frame"><input id = "',
                                    '_Location_Number" class="name" placeholder="Lot Number" /><div id= "',
                                    '_Error_Location_Number" class="error hidden"></div></div><div id= "',
                                    '_Location_Street_Frame"><input id = "',
                                    '_Location_Street" class="name" placeholder="Street" /><div id= "',
                                    '_Error_Location_Street" class="error hidden"></div></div><div id= "',
                                    '_Location_ZIP_Frame"><input id = "',
                                    '_Location_ZIP" class="name" placeholder="ZIP" /><div id= "',
                                    '_Error_Location_ZIP" class="error hidden"></div></div><div id= "',
                                    '_Location_City_Frame"><input id = "',
                                    '_Location_City" class="name" placeholder="City" /><div id= "',
                                    '_Error_Location_City" class="error hidden"></div></div><div id= "',
                                    '_Location_Country_Frame"><input id = "',
                                    '_Location_Country" class="name" placeholder="Country" /><div id= "',
                                    '_Error_Location_Country" class="error hidden"></div></div></div><button id="',
                                    '_Location_Save" class="btSave">Save</button>'];
    let serverEnum = [];
    let localPointCounter = [];
    let categoryEnum = [];
    let dataEnum;
    let selectLists = ["Network", "Server"];
    let addFrames = ["Server", "Category", "Network", "Service", "Location", "CustomLink"];
    let fetchURL = ["servers", "categories", "networks", "services", "locations", "customlinks"];
    let locations = ["Campus T1, T.5, T2, T3, T4, T5, T6", "T7", "T8", "T9", "T10", "T11", "T12", "T13", "T14"]
    let customized = [false, false];
    let ServerNames = [];
    let properties = ["Name", "IPAddress", "Port", "SubnetMask", "Number", "Street", "ZIP", "City", "Coutrty"]
    let regex = [new RegExp(/.*/), new RegExp(/^([\d]|\.)+$/), new RegExp(/^\d+$/), new RegExp(/^(\b([1-9]|[12][0-9]|3[01])\b)$/), new RegExp(/.*/), new RegExp(/.*/), new RegExp(/^\d+$/), new RegExp(/.*/), new RegExp(/.*/)];
    let error = [false, false, false, false];
    let htmlAddFootEntry = '<div class="footerItemFrame"><a id="btAddCustomLink">+</a></div>'
    let errorLocations;
    let DOMenum =["header", "menuFrame", "footer"];

    let counter;
    let secondCounter;
    let names;
    let radios;
    let gotData;
    let gotDataUpper;
    let adminMode = false;
    let showMap = false;

    //search
    let searchString = "";

    //UI

        //state
        let subnet = 11;

        //DOM
    let points = [];
    let pointsHTML = [];
    let displayPoints = [];
    let selectedLocation= 0;
    let btSwitchVersion;
    let createdPoint = false;
    let currentOpenedMenu = 0; // 0 = no one
    let addCustomLinkMenuIsOpen = false;
    let addFrameIsOpened = [false, false, false, false];
    let headEntries = []
    let htmlHeadEntries = []; 
    let htmlMenuEntries = [];
    let searchResultEntries = [];
    let menu = [];
    let DOM = [];
    let addServerInformationFrame;
    let addCategoryInformationFrame;
    let addNetworkInformationFrame;
    let addServiceInformationFrame;
    let addLocationInformationFrame;
    let htmlHeader;
    let htmlMenus;
    let htmlAdminPanel;
    let htmlFooter;
    let rbNoHTTPS
    let rbHTTPS
    let rbVirtual
    let tbNewServerName
    let tbNewServerIPAddress
    let tbNewServerSubnetMask
    let sbNewServerHostName
    let sbNewServerNetwork
    let sbNewServerLocation
    let tbNewCategoryDisplayName
    let tbNewCategoryName
    let tbNewCategoryPort
    let tbNewNetworkName
    let sbNewNetworkSubnetOff
    let tbNewServiceName
    let tbNewServiceDisplayName
    let sbNewServiceRunsOn
    let tbNewLocationCountry;
    let tbNewLocationCity;
    let tbNewLocationNumber;
    let tbNewLocationStreet
    let tbNewLocationZIP;
    let btAddServer;
    let btAddCategory;
    let btAddNetwork;
    let btAddService;
    let btAddLocation;
    let btSave = [];
    let btSaveNewCategory;
    let btSaveNewServer;
    let btSaveNewNetwork;
    let btSaveNewService;
    let btSaveNewLocation;
    let tbSearch;
    let btAddCustomLink;
    let menuAddCustomLink;
    let tbCustomLinkName;
    let btShowMap;
    let tbCustomLinkRef;
    let btSaveCustomLink;
    let serverHostNameFrame;
    let rbAdminMode;
    let rbAdminModeGeometric;
    let btEdit = [];
    let btDelete = [];
    let drawing;
    let maxWidth = 16 // in px 

    window.onload = () => {

        dataEnum = [{name: "Server", data:["Name", "IPAddress", "HostName", "Network", "Location", "x", "y", "Room", "Sector", "Subnet"]}, 
                    {name: "Category", data:["Name", "DisplayName", "isHTTPS", "Port"]},
                    {name: "Netowrk", data:["Name", "SubnetOff"]},
                    {name: "Service", data:["Name", "DisplayName", "RunsOn"]},
                    {name: "CustomLink", data:["Name", "Ref"]}]

        names = [["", "", "", "", "", 0, 5, "R1", "1. UG", ""],["", "", false, "443"], ["",""], ["", "", ""], ["",""]];

        radios = new HashTable();
        radios.setItem("Server", new HashTable());
        radios.getItem("Server").setItem("IsVirtual", false);
        radios.setItem("Category", new HashTable());
        radios.getItem("Category").setItem("IsHTTPS", false);
        radios.setItem("Network", new HashTable());
        radios.setItem("Service", new HashTable());
        gotData = new HashTable();
        gotDataUpper = new HashTable();
        
        console.log(databaseURL);
        
        try{
            getData("categories", function()
            {
                getData("servers", function()
                {
                    getData("networks", function()
                    {
                        getData("services", function()
                        {
                            getData("locations", function()
                            {
                                getData("customlinks", function()
                                {
                                    render();
                                }
                                )
                            }
                            )

                        }
                        )

                    }
                    )
                }
                )
            }
            )
        }
        catch{
            console.log("failed looking for data");
        }

    }


    let switchVersion = (sender) => {

        let element = sender.path[0];
        let x = document.querySelectorAll(".staging");
        //console.log(x);
        if(element.innerHTML == "Staging")
        {
            staging = false;
            console.log("Staging")
            element.innerHTML = "Release";
            x.forEach((one)=> {
                //console.log("one",one)
                one.classList.add("hidden");
            })
        }
        else{
            staging = true;
            console.log("Release")
            element.innerHTML = "Staging"
            x.forEach((one)=> {
                //console.log("this", one)
                one.classList.remove("hidden");
            })
        }
    } 

    let switchAdminMode = (sender) => {

        let color = rbAdminMode.style.backgroundColor;
        let margin = rbAdminModeGeometric.style.marginLeft;
        let x = document.querySelectorAll(".admin");
        if(!adminMode)
        {
            adminMode = true;
            x.forEach((one)=> {
                //console.log("one",one)
                one.classList.remove("hidden");
            })
            //htmlAdminPanel.classList.remove("hidden");
            rbAdminMode.style.backgroundColor = "green";
            rbAdminModeGeometric.style.marginLeft = "auto";
        }
        else{
            adminMode = false;
            //htmlAdminPanel.classList.add("hidden");
            x.forEach((one)=> {
                //console.log("one",one)
                one.classList.add("hidden");
            })
            rbAdminMode.style.backgroundColor= "#FFC0CB";
            rbAdminModeGeometric.style.marginLeft = "0";
        }
        console.log("admin "+adminMode)
    }

    function getData(data, callback) {
        gotData.setItem(data, []);
        gotDataUpper.setItem(data, []);
        //try{
            fetch((`${databaseURL}/`+data), {
                method: 'GET',
                headers: new Headers({
                    //Authorization: 'BEARER ' + token,
                    Accept: 'application/json',
                }),
            }).then( response =>{ 
                console.log(response);
                if(response != null && response.status == 200)
                {
                    response.json().then(
                        thing => {console.log("database ",thing, data);gotData.setItem(data, thing);
                        if(data == "servers" || "categories" || "services" || "customlinks" || "networks")
                        {
                            let array = [];
                            //save upper cased string
                            gotData.getItem(data).forEach((one) => {
                                //console.log(one+" "+one.name)
                                array.push(one.name.toUpperCase())
                            })
                            gotDataUpper.setItem(data, array);
                        }
                        callback();
                        }
                    );
                }
                else
                {
                    console.log("no content in "+data+" found "+response.status);
                    gotData.getItem(data).forEach((one) => {
                        //console.log(one+" "+one.name)
                        array.push(one.name.toUpperCase())
                    })
                    gotDataUpper.setItem(data, array);
                }
            }
            )
            .catch(
                message => {
                    console.log("timed out. " + message);
                    callback();
                }
            )
            ;
        /*}
        catch{
            Write-Host("could not find backend");
            callback()
        }*/

    }

    let saveData = (data) => {
        switchEnabilityOfAllButtons(false);
        let newItem = new Item(addFrames.indexOf(data), names, dataEnum, addFrames);
        let newObject = newItem.getObject();
        console.log("saving data",newObject, dataEnum[addFrames.indexOf("Category")], names, newItem, data);
        fetch(`${databaseURL}/${fetchURL[addFrames.indexOf(data)]}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newObject) //'{"Name":"","isHTTPS":0,"DisplayName":""}' //JSON.stringify(newCategory),
        }).then( response =>{
            if(response.status == 200)
            {
                response.json().then(
                    thing => {//console.log("database ",thing); //reload top level
                
                        if(!testMode){
                            window.location.reload(true);
                        }
                    
                        switchEnabilityOfAllButtons(true);
                    }
                );
            }
        }
        );
    }

    /*let deleteData = (sender) => {
        let element = sender.path[0];
        let id = element.getAttribute("id");
        let idSplitted = id.split("_");
        console.log(id,idSplitted[1], idSplitted);
        let data = idSplitted[1];
        let newObject = {"Name": idSplitted[2]}
        fetch(`${databaseURL}/${fetchURL[addFrames.indexOf(data)]}?id=28`, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newObject) //'{"Name":"","isHTTPS":0,"DisplayName":""}' //JSON.stringify(newCategory),
        }).then( response =>{
            if(response.status == 200)
            {
                response.json().then(
                    thing => {console.log("database ",newObject, thing); //reload top level
                
                        window.location.reload(true);!!
                    
                        switchEnabilityOfAllButtons(true);
                    }
                );
            }
        }
        );
    }*/

    let edit = (sender) => {
        let element = sender.path[0];
        let id = element.getAttribute("id");
        let idSplitted = id.split("_");
        //console.log(element.innerHTML, id, idSplitted[1], ("addServerInformationFrame_"+idSplitted[2]), idSplitted);
        if(element.innerHTML != "Close")
        {
            element.innerHTML = "Close";
            document.getElementById(("addServerInformationFrame_"+idSplitted[2])).classList.remove("hidden")
        }
        else
        {
            //console.log("open it "+idSplitted[2])
            element.innerHTML = "Bearbeiten";
            document.getElementById(("addServerInformationFrame_"+idSplitted[2])).classList.add("hidden")
        }
    }

    let buildOptions = (type, data) => {
        //console.log(data);
        switch(type)
        {
            case "Server":
                let htmlIndividualServerOptions = '';
                htmlServerOptions.forEach((entry) => {
                    //console.log((entry.concat(data)), htmlServerOptions.indexOf(entry), (htmlServerOptions.length-1), (htmlServerOptions.indexOf(entry) != (htmlServerOptions.length-1)));
                    if(htmlServerOptions.indexOf(entry) != (htmlServerOptions.length-1))
                    {
                        htmlIndividualServerOptions= htmlIndividualServerOptions.concat(entry.concat(data))
                    }
                    else
                    {
                        htmlIndividualServerOptions = htmlIndividualServerOptions.concat(entry);
                    }
                })
                //console.log(htmlIndividualServerOptions)
                return htmlIndividualServerOptions
                break;
            case "Category":
                let htmlIndividualCategoryOptions = '';
                htmlCategoryOptions.forEach((entry) => {
                    //console.log((entry.concat(data)), htmlServerOptions.indexOf(entry), (htmlServerOptions.length-1), (htmlServerOptions.indexOf(entry) != (htmlServerOptions.length-1)));
                    if(htmlCategoryOptions.indexOf(entry) != (htmlCategoryOptions.length-1))
                    {
                        htmlIndividualCategoryOptions= htmlIndividualCategoryOptions.concat(entry.concat(data))
                    }
                    else
                    {
                        htmlIndividualCategoryOptions = htmlIndividualCategoryOptions.concat(entry);
                    }
                })
                //console.log(htmlIndividualServerOptions)
                return htmlIndividualCategoryOptions
                break;
            case "Network":
                let htmlIndividualNetworkOptions = '';
                htmlNetworkOptions.forEach((entry) => {
                    //console.log((entry.concat(data)), htmlServerOptions.indexOf(entry), (htmlServerOptions.length-1), (htmlServerOptions.indexOf(entry) != (htmlServerOptions.length-1)));
                    if(htmlNetworkOptions.indexOf(entry) != (htmlNetworkOptions.length-1))
                    {
                        htmlIndividualNetworkOptions= htmlIndividualNetworkOptions.concat(entry.concat(data))
                    }
                    else
                    {
                        htmlIndividualNetworkOptions = htmlIndividualNetworkOptions.concat(entry);
                    }
                })
                //console.log(htmlIndividualServerOptions)
                return htmlIndividualNetworkOptions
                break;
            case "Service":
                let htmlIndividualServiceOptions = '';
                htmlServiceOptions.forEach((entry) => {
                    //console.log((entry.concat(data)), htmlServerOptions.indexOf(entry), (htmlServerOptions.length-1), (htmlServerOptions.indexOf(entry) != (htmlServerOptions.length-1)));
                    if(htmlServiceOptions.indexOf(entry) != (htmlServiceOptions.length-1))
                    {
                        htmlIndividualServiceOptions= htmlIndividualServiceOptions.concat(entry.concat(data))
                    }
                    else
                    {
                        htmlIndividualServiceOptions = htmlIndividualServiceOptions.concat(entry);
                    }
                })
                //console.log(htmlIndividualServerOptions)
                return htmlIndividualServiceOptions
                break;
            case "Location":
                let htmlIndividualLocationOptions = '';
                htmlLocationOptions.forEach((entry) => {
                    //console.log((entry.concat(data)), htmlLocationOptions.indexOf(entry), (htmlLocationOptions.length-1), (htmlLocationOptions.indexOf(entry) != (htmlLocationOptions.length-1)));
                    if(htmlLocationOptions.indexOf(entry) != (htmlLocationOptions.length-1))
                    {
                        htmlIndividualLocationOptions= htmlIndividualLocationOptions.concat(entry.concat(data))
                    }
                    else
                    {
                        htmlIndividualLocationOptions = htmlIndividualLocationOptions.concat(entry);
                    }
                })
                //console.log(htmlIndividualLocationOptions)
                return htmlIndividualLocationOptions
                break;
        }
    }
    let onNameSettingsChange = (data) => {
        let id = data.getAttribute("id");
        let idSplitted = id.split("_"); 
        let errorHtml = document.getElementById(("new_Error_"+idSplitted[1]+"_"+idSplitted[2]));
        if(errorHtml != null)if(!errorHtml.classList.contains("hidden"))errorHtml.classList.add("hidden");
        console.log("name changed in "+ id + "to ",data.value, " two ", idSplitted[2], " first ", idSplitted[1])

        if(idSplitted[2] == "DisplayName" && idSplitted[1] == "Service" && data.value === "")
        {
            customized[1] = false;
        }
        if(idSplitted[2] == "DisplayName" && idSplitted[1] == "Category" && data.value === "")
        {
            customized[0] = false;
        }
        if (idSplitted[2] == "IPAddress" && (regex[properties.indexOf(idSplitted[2])].exec(data.value) != null))
        {

        }
        if( (idSplitted[2] == "IPAddress" &&  idSplitted[1] == "Server"))
        {
            names[addFrames.indexOf("Server")][dataEnum[addFrames.indexOf("Server")].data.indexOf("Subnet")] = tbNewServerSubnetMask.value;
                //console.log(Number(names[addFrames.indexOf("Server")][dataEnum[addFrames.indexOf("Server")].data.indexOf("Subnet")]), dataEnum[addFrames.indexOf("Server")].data.indexOf("Subnet"))
            sbNewServerNetwork.innerHTML = ("Network: "+binaryToAddress(getSubnetFromAddress(addressToBinary(data.value), Number(names[addFrames.indexOf("Server")][dataEnum[addFrames.indexOf("Server")].data.indexOf("Subnet")]))))
        }
        if (idSplitted[2] == "SubnetMask")
        {

        }

        //duplicate
        if(idSplitted[2] == "Name" && idSplitted[1] == "Category" && customized[0] == false)
        {   
            tbNewCategoryDisplayName.value = data.value;
            onNameSettingsChange(tbNewCategoryDisplayName);
        }
        if(idSplitted[2] == "Name" && idSplitted[1] == "Service" && customized[1] == false)
        {   
            tbNewServiceDisplayName.value = data.value;
            onNameSettingsChange(tbNewServiceDisplayName);
        }

        //test

        if((idSplitted[2] == "Name" || idSplitted[2] == "Number" || idSplitted[2] == "Street" || idSplitted[2] == "ZIP" || idSplitted[2] == "City" || idSplitted[2] == "Germany") && data.value == "")
        {
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = " ! cannot be null";
            console.log(error);
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }
        else if (idSplitted[2] == "SubnetMask" && (!(regex[properties.indexOf(idSplitted[2])].test(data.value)) && data.value != "" && data.value != null))
        {
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = " ! must be number between 1 - 31";
            console.log(error);
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }
        else if (idSplitted[2] == "Name" && gotDataUpper.getItem(fetchURL[addFrames.indexOf(idSplitted[1])]).includes(data.value.toUpperCase())){
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = " ! already exists";
            console.log(error)
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }
        else if(idSplitted[2] == "IPAddress" && (!(regex[properties.indexOf(idSplitted[2])].test(data.value)) && data.value != ""))
        {
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = " ! forbidden symbols";
            console.log(error);
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }
        else if(idSplitted[2] == "Port" && !(regex[properties.indexOf(idSplitted[2])].test(data.value)))
        {
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = "! forbidden symbols";
            console.log(error);
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }
        else if(idSplitted[2] == "Number" && (!(regex[properties.indexOf(idSplitted[2])].test(data.value)) && data.value != "") ){
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = " ! forbidden symbols";
            console.log(error);
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }
        else if(idSplitted[2] == "Street" && (!(regex[properties.indexOf(idSplitted[2])].test(data.value)) && data.value != "")){
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = " ! forbidden symbols";
            console.log(error);
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }
        else if(idSplitted[2] == "ZIP" && (!(regex[properties.indexOf(idSplitted[2])].test(data.value)) && data.value != ""))
        {
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = " ! forbidden symbols";
            console.log(error);
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }
        else if(idSplitted[2] == "City" && (!(regex[properties.indexOf(idSplitted[2])].test(data.value)) && data.value != ""))
        {
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = " ! forbidden symbols";
            console.log(error);
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }
        else if(idSplitted[2] == "Country" && (!(regex[properties.indexOf(idSplitted[2])].test(data.value)) && data.value != ""))
        {
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            let error = " ! forbidden symbols";
            console.log(error);
            errorHtml.innerHTML = error;
            errorHtml.classList.remove("hidden");
        }    
        else if(idSplitted[2] === "HTTPS" || idSplitted[2] === "NoHTTPS")
        {
            btSave[addFrames.indexOf(idSplitted[1])].disabled = true;
            console.log("radio thing ", idSplitted[2], " abfrage ");
            names[addFrames.indexOf("Category")][dataEnum[addFrames.indexOf("Category")].data.indexOf("isHTTPS")] = (idSplitted[2] === "HTTPS");
            rbHTTPS.checked = (idSplitted[2] === "HTTPS");
            rbNoHTTPS.checked = (idSplitted[2] !== "HTTPS");
            let errorHtml = document.getElementById("new_Error_Category_Port");
            if(names[addFrames.indexOf("Category")][dataEnum[addFrames.indexOf("Category")].data.indexOf("isHTTPS")]) 
            {
                tbNewCategoryPort.value = "443";
                names[addFrames.indexOf("Category")][dataEnum[addFrames.indexOf("Category")].data.indexOf("Port")] = "443";
            } 
            else
            {
                tbNewCategoryPort.value = "80";
                names[addFrames.indexOf("Category")][dataEnum[addFrames.indexOf("Category")].data.indexOf("Port")] =  "80";
            }
            errorHtml.classList.add("hidden");
            let hasErrors = false;
            errorLocations[addFrames.indexOf(idSplitted[1])].forEach((entry) => {
                console.log(entry)
                if(!entry.classList.contains("hidden"))
                    hasErrors = true;
                    console.log("got")
            })
            btSave[addFrames.indexOf(idSplitted[1])].disabled = hasErrors;
        }
        else{ //no error found
            names[addFrames.indexOf(idSplitted[1])][dataEnum[addFrames.indexOf(idSplitted[1])].data.indexOf(idSplitted[2])] = data.value;
            //console.log(data.value, "super", names);
            //console.log(idSplitted[1], idSplitted[2], data.value, "result", names.getItem(idSplitted[1]));
            let hasErrors = false;
            errorLocations[addFrames.indexOf(idSplitted[1])].forEach((entry) => {
                console.log(entry)
                if(!entry.classList.contains("hidden"))
                    hasErrors = true;
                    console.log("got "+hasErrors)
            })
            btSave[addFrames.indexOf(idSplitted[1])].disabled = hasErrors;
        }
    }

    let switchEnabilityOfAllButtons = (status) => {
        btAddCategory.disabled = (!status);
        btAddNetwork.disabled = (!status);
        btAddService.disabled = (!status);
        btAddServer.disabled = (!status);
        btAddLocation.disabled = (!status);
        btSaveNewCategory.disabled = (status);
        btSaveNewServer.disabled = (status);
        btSaveNewService.disabled = (status);
        btSaveNewNetwork.disabled = (status);
        btSaveNewLocation.disabled = (status);
    }

    let switchMapVisibility = (status) => {
        if(!showMap){
            showMap = true;
            createVisualization();
            drawing.classList.remove("hidden");
        }
        else{
            showMap = false;
            counter = 0;
            points.forEach((individual) =>{
                individual.remove(counter);
                counter++;
            })
            drawing.classList.add("hidden")
        }
    }

    let savePoints = () => {
        counter = 0;
        gotData.getItem("servers").forEach((one) => {
            let calculatedX = (Number((pointsHTML[counter].style.left).replace("px", "")) +(Number(pointsHTML[counter].offsetWidth) / 2))
            let calculatedY = (Number((pointsHTML[counter].style.top).replace("px", "")) + (Number(pointsHTML[counter].offsetWidth)) / 2 )
            console.log((counter), (Number((pointsHTML[counter].style.left).replace("px", "")) +(Number(pointsHTML[counter].offsetWidth) / 2)), (Number((pointsHTML[counter].style.top).replace("px", "")) + (Number(pointsHTML[counter].offsetWidth)) / 2 ))
            points[counter].xCenter = calculatedX;
            points[counter].yCenter = calculatedY;
            counter++;          
            saveData("Server");
        })
        console.log(points);
    }

    let createVisualization = () => {
     
         let html =('<div id="image0"><img id= "image" src ="/' +images[selectedLocation]+ '" width="'+width+'" /> </div>');
        document.getElementById("canvas").innerHTML = html;
        points = [];
        pointsHTML = [];
        counter=0;
        gotData.getItem("servers").forEach((one) => {
            let y = one.positionY;
            let x = one.positionX;
            points.push(new Point(x,y, one.name, counter));
            pointsHTML[counter] = document.getElementById(("serverPoint_"+counter))
            counter++;
        })
        //console.log(pointsHTML[0])
        counter = 0;
        gotData.getItem("servers").forEach((one) => {
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
        })
        //console.log(pointsHTML[0])
        //createdPoint = true;
    }

    let onLocationSelectChange = (locationSelected) => {
        let currentlySelected = document.getElementById(("locationEntry_"+selectedLocation));
        currentlySelected.classList.remove("locationEntrySelected");
        //console.log("clicked", locationSelected, " good ", currentlySelected, selectedLocation);
        selectedLocation = (locationSelected.split("_"))[1];
        document.getElementById((locationSelected)).classList.add("locationEntrySelected");
        createVisualization();
    }

    let onSearchChange = (data) => {
        let searchResultHTML = "";
        let filteredServerTitles = [];
        let filteredServiceTitles = [];
        //let input = data.path[0];
        searchString = data.value.toUpperCase();
        let element = document.getElementById("searchResults");
        let elementFrame = document.getElementById("searchResultsFrame");
        //console.log(searchString)
        /*console.log(data);*/
        if(searchString != null && searchString != "")
        {
            filteredServerTitles = gotData.getItem("servers").filter((title) => {let upper = title.name.toUpperCase();return(upper.includes(searchString));})
            filteredServiceTitles = gotData.getItem("services").filter((title) => {let upper = title.name.toUpperCase();return(upper.includes(searchString));})

            if(filteredServerTitles.length > 0 || filteredServiceTitles.length > 0)
            {
                if(filteredServerTitles.length > 0){
                    searchResultHTML += '<div id="searchResultsServers" class="searchResultsPart"><div id="searchResultsServersHead"><b>Servers</b></div>';
                    counter = 0;
                    filteredServerTitles.forEach((serverTitle) => {//console.log("length of filtered servers array "+filteredServerTitles.length);
                    let entry = serverTitle.name;
                    searchResultHTML +=
                        ('<div class="searchResultItemFrame" id="searchResultItemFrame_'
                        + entry
                        +'"><a class="searchResultItem" id="searchResultItem_'
                        + entry
                        + '" name = "'
                        + entry
                        + '">'
                        +entry
                        + '</a></div>');
                        counter++;
                    })
                    searchResultHTML += "</div>";         
                }

                if(filteredServiceTitles.length > 0){
                    searchResultHTML += '<div id="searchResultsServices" class="searchResultsPart"><div id="searchResultsServicesHead"><b>Services</b></div>'
                    counter = 0;
                    filteredServiceTitles.forEach((serviceTitle) => {//console.log("length of filtered services array "+filteredServiceTitles.length);
                        let entry = serviceTitle.name;
                        let runsOn = serviceTitle.runsOn;
                        searchResultHTML +=
                            ('<div class="searchResultItemFrame" id="searchResultItemFrame_'
                            + entry
                            +'"><a class="searchResultItem" id="searchResultItem_'
                            + entry
                            + '" name = "'
                            + entry
                            + '">'
                            +entry
                            + '</a><div class="searchResultsCoItemFrame"><i>runs on </i><a class="searchResultCoItem" id="searchResultCoItem_'+entry+'" name="'+runsOn+'">'+runsOn+'</a></div></div>');
                        counter++;
                    })
                    searchResultHTML += "</div>"; 
                }
            }
            else{searchResultHTML = "<k>Keine Suchergebnisse gefunden.</k>"}
            
            //console.log(filteredServerTitles > 0);
            element.innerHTML = searchResultHTML;
            if(filteredServerTitles.length > 0){
                counter = 0;
                    filteredServerTitles.forEach((title)=> {
                        let entry = title.name;
                        //console.log("clicker", document.getElementById(("searchResultItem_"+(counter +1))));
                        document.getElementById(("searchResultItem_"+entry)).addEventListener("click", (information) => {openMenu(information.srcElement); console.log("servers")});
                    })
            }
            if(filteredServiceTitles.length >0){
                counter = 0;
                    filteredServiceTitles.forEach((title)=> {
                        let entry = title.name;
                        document.getElementById(("searchResultCoItem_"+entry)).addEventListener("click", (information) => {openMenu(information.srcElement); console.log("services")});
                    })
            }

            elementFrame.classList.remove("hidden");
        }
        else{
            searchResultEntries = [];
            element.innerHTML = "";
            elementFrame.classList.add("hidden");
        }
    }  

    let openMenu = (button) => {
        let menuName = (button.getAttribute("name"));
        let menuId = (button.getAttribute("id"));
        //console.log("menu ", menuName);
        let menuNameString = "menu_"+menuName;
        let currentOpenedMenuString = "menu_"+currentOpenedMenu;
        let currentOpenedItemString = "item_"+menuName;
        let lastOpenedItemString = "item_"+currentOpenedMenu;
        if(currentOpenedMenu != 0){ 
            document.getElementById(currentOpenedMenuString).classList.add("hidden");
            document.getElementById(lastOpenedItemString).classList.remove("choosen");
        }

        if(menuName === currentOpenedMenu)
        {
            currentOpenedMenu = 0;    
        }
        else{
            currentOpenedMenu = menuName;
            document.getElementById(menuNameString).classList.remove("hidden");
            //console.log(document.getElementById(""+currentOpenedItemString).classList);
            document.getElementById(currentOpenedItemString).classList.add("choosen");
        }
            
    }
    let openAddFrame = (name) => {
        let id= "btAdd"+name;
        let button = document.getElementById(id);
        button.disabled = true;

        id = "add"+name+ "InformationFrame";
        if(addFrameIsOpened[addFrames.indexOf(name)])
        {
            document.getElementById(id).classList.add("hidden");
            button.innerHTML = ("Add"+name)
            addFrameIsOpened[addFrames.indexOf(name)] = false;
        }
        else
        {
            document.getElementById(id).classList.remove("hidden");
            button.innerHTML = "Close";
            addFrameIsOpened[addFrames.indexOf(name)] = true;
        }
        button.disabled = false;
    }

    let render = () => {
        
        addServerInformationFrame = document.getElementById("addServerInformationFrame")
        addServerInformationFrame.innerHTML = buildOptions("Server", "new");
        addCategoryInformationFrame = document.getElementById("addCategoryInformationFrame")
        addCategoryInformationFrame.innerHTML = buildOptions("Category", "new");
        addNetworkInformationFrame = document.getElementById("addNetworkInformationFrame")
        addNetworkInformationFrame.innerHTML = buildOptions("Network", "new");
        addServiceInformationFrame = document.getElementById("addServiceInformationFrame")
        addServiceInformationFrame.innerHTML = buildOptions("Service", "new");
        addLocationInformationFrame = document.getElementById("addLocationInformationFrame");
        addLocationInformationFrame.innerHTML = buildOptions("Location","new")

        DOMenum.forEach((one) => {
            DOM[DOMenum.indexOf(one)] = document.getElementById(one);
        })
        htmlHeader = document.getElementById("header");
        htmlMenus = document.getElementById("menuFrame");
        htmlAdminPanel = document.getElementById("adminPanel");
        htmlFooter = document.getElementById("footer");

        btAddServer = document.getElementById("btAddServer");
        btAddCategory = document.getElementById("btAddCategory");
        btAddNetwork = document.getElementById("btAddNetwork");
        btAddService = document.getElementById("btAddService");
        btAddLocation = document.getElementById("btAddLocation");
        btShowMap = document.getElementById("btShowMap");
        addFrames.forEach((one) => {
            let id = "new_"+one+"_Save";
            //console.log(id, document.getElementById(id))
            btSave[addFrames.indexOf(one)] = document.getElementById(id);
            btSave[addFrames.indexOf(one)].disabled = true;

        })
        errorLocations = [
            [document.getElementById("new_Error_Server_Name"),document.getElementById("new_Error_Server_IPAddress")/*, document.getElementById("error_Server_Network") */,document.getElementById("new_Error_Server_SubnetMask"), document.getElementById("new_Error_Server_Location")],
            [document.getElementById("new_Error_Category_Name"),document.getElementById("new_Error_Category_DisplayName"),document.getElementById("new_Error_Category_Port")],
            [document.getElementById("new_Error_Network_Name"),document.getElementById("new_Error_Network_SubnetOff")],
            [document.getElementById("new_Error_Service_Name"),document.getElementById("new_Error_Service_DisplayName"),document.getElementById("new_Error_Service_RunsOn")],
            [document.getElementById("new_Error_Location_Number"),document.getElementById("new_Error_Location_Street"),document.getElementById("new_Error_Location_ZIP"),document.getElementById("new_Error_Location_City"),document.getElementById("new_Error_Location_Country")],
            []
        ];
        errorLocations.forEach((firstEntry) => { // set each error visible
            //console.log(firstEntry);
            firstEntry.forEach((secondEntry) =>{
                //console.log(secondEntry);
                secondEntry.classList.remove("hidden");
            })
        })
        errorLocations[1][2].classList.add("hidden");
        errorLocations[0][1].classList.add("hidden"); // IP-Address is not a mandatory input
        errorLocations[0][2].classList.add("hidden"); // Subnet Mask is not mandatory
        btSwitchVersion = document.getElementById("btSwitchVersion");
        btSaveNewCategory = document.getElementById("new_Category_Save");
        btSaveNewServer = document.getElementById("new_Server_Save");
        btSaveNewNetwork = document.getElementById("new_Network_Save");
        btSaveNewService = document.getElementById("new_Service_Save");
        btSaveNewLocation = document.getElementById("new_Location_Save");
        tbSearch = document.getElementById("search");
        rbNoHTTPS = document.getElementById("new_Category_NoHTTPS");
        rbHTTPS = document.getElementById("new_Category_HTTPS");
        rbVirtual = document.getElementById("new_Server_IsVirtual");
        tbNewServerName = document.getElementById("new_Server_Name");
        tbNewServerIPAddress = document.getElementById("new_Server_IPAddress");
        tbNewServerSubnetMask = document.getElementById("new_Server_SubnetMask");
        sbNewServerHostName = document.getElementById("new_Server_HostName");
        sbNewServerLocation = document.getElementById("new_Server_Location");
        sbNewServerNetwork = document.getElementById("new_Server_Network");
        tbNewCategoryDisplayName = document.getElementById("new_Category_DisplayName");
        tbNewCategoryName = document.getElementById("new_Category_Name");
        tbNewCategoryPort = document.getElementById("new_Category_Port");
        tbNewNetworkName = document.getElementById("new_Network_Name");
        sbNewNetworkSubnetOff = document.getElementById("new_Network_SubnetOff");
        tbNewServiceName = document.getElementById("new_Service_Name");
        tbNewServiceDisplayName = document.getElementById("new_Service_DisplayName");
        sbNewServiceRunsOn = document.getElementById("new_Service_RunsOn");
        tbNewLocationNumber = document.getElementById("new_Location_Number");
        tbNewLocationStreet = document.getElementById("new_Location_Street");
        tbNewLocationZIP = document.getElementById("new_Location_ZIP");
        tbNewLocationCity = document.getElementById("new_Location_City");
        tbNewLocationCountry = document.getElementById("new_Location_Country");
        btAddCustomLink = document.getElementById("btAddCustomLink");
        menuAddCustomLink = document.getElementById("customLinkMenuFrame");
        tbCustomLinkName = document.getElementById("tb_CustomLink_Name");
        tbCustomLinkRef = document.getElementById("tb_CustomLink_Ref");
        btSaveCustomLink = document.getElementById("new_CustomLink_Save");
        rbAdminMode = document.getElementById("rbAdminMode");
        rbAdminModeGeometric = document.getElementById("rbAdminModeGeometric");
        drawing = document.getElementById("map")

        serverHostNameFrame = document.getElementById("new_Server_HostName_Frame");

        rbHTTPS.checked = true;
        rbNoHTTPS.checked = false;

        btAddServer.addEventListener("click", () => openAddFrame("Server"));
        btAddCategory.addEventListener("click", () => openAddFrame("Category"));
        btAddNetwork.addEventListener("click", () => openAddFrame("Network"));
        btAddService.addEventListener("click", () => openAddFrame("Service"));
        btAddLocation.addEventListener("click", () => openAddFrame("Location"));
        btSwitchVersion.addEventListener("click", (data) => switchVersion(data))
        btSaveNewCategory.addEventListener("click", () => saveData("Category"));
        btSaveNewServer.addEventListener("click", () => saveData("Server"));
        btSaveNewNetwork.addEventListener("click", () => saveData("Network"));
        btSaveNewService.addEventListener("click", () => saveData("Service"));
        btSaveNewLocation.addEventListener("click", () => saveData("Location"));
        tbNewServerName.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        rbNoHTTPS.addEventListener("click", (data) => onNameSettingsChange(data.path[0]));
        rbHTTPS.addEventListener("click", (data) => onNameSettingsChange(data.path[0]));
        rbVirtual.addEventListener("click", (data) => {if(radios.getItem("Server").getItem("IsVirtual")) {/*console.log("yes", rbVirtual);*/ radios.getItem("Server").setItem("IsVirtual", false); serverHostNameFrame.classList.add("hidden"); rbVirtual.checked = false;} 
            else{console.log("no", rbVirtual); radios.getItem("Server").setItem("IsVirtual", true); serverHostNameFrame.classList.remove("hidden"); rbVirtual.checked = true;}});
        tbNewServerIPAddress.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewServerSubnetMask.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        sbNewServerHostName.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        sbNewServerLocation.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewCategoryDisplayName.addEventListener("input", (data) => {customized[0] = true; onNameSettingsChange(data.path[0]);});
        tbNewCategoryName.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewCategoryPort.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewServiceName.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewServiceDisplayName.addEventListener("input", (data) => {customized[1] = true; onNameSettingsChange(data.path[0]);});
        sbNewServiceRunsOn.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewNetworkName.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        sbNewNetworkSubnetOff.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewLocationCountry.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewLocationNumber.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewLocationStreet.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewLocationZIP.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        tbNewLocationCity.addEventListener("input", (data) => onNameSettingsChange(data.path[0]));
        btAddCustomLink.addEventListener("click", (data)=> {if(addCustomLinkMenuIsOpen){menuAddCustomLink.classList.add("hidden");addCustomLinkMenuIsOpen=false;}else{menuAddCustomLink.classList.remove("hidden");addCustomLinkMenuIsOpen = true;}})
        tbCustomLinkName.addEventListener("input", (data)=> onNameSettingsChange(data.path[0]));
        tbCustomLinkRef.addEventListener("input", (data)=> onNameSettingsChange(data.path[0]));;
        btSaveCustomLink.addEventListener("click", ()=> saveData("CustomLink"));
        search.addEventListener("input", (data) => onSearchChange(data.path[0]));
        rbAdminMode.addEventListener("click", () => {switchAdminMode();})
        btShowMap.addEventListener("click", () => {switchMapVisibility()})

        counter = 0;
        let begin;
        serverEnum = [];
        let htmlSb = new HashTable();
        btEdit = [];
        btDelete = [];
        htmlHeadEntries = [];
        let htmlFootEntry = "";
        let newHead = "";

        let preparedHTMLAdminPanelList = '<table id="adminPanelList">'

        htmlMenuEntries = []; 
        htmlHeader.innerHTML = "";
        htmlFooter.innerHTML = htmlAddFootEntry;
        htmlSb.setItem('Server','');
        htmlSb.setItem('Network','');
        htmlSb.setItem('Location', '');
        let serverList = '<option value = "" disabled selected>Select a Server';
        let networkList = '<option value = "" disabled selected>Select a Network';
        let locationList = '<option value = "" disabled selected>Select a Location';
        //console.log("is fetched "+ (gotData.getItem("servers") != null))
        if(gotData.getItem("servers") != null)
        {
            gotData.getItem("servers").forEach((individual) => {
                let entry = individual.name;//console.log(individual);
                let htmlHeadEntry= "";
                let htmlAdminPanelEntry = "";

                serverEnum.push(entry);      
                let htmlMenuEntry;
                serverList +='<option value="'+entry+'">'+entry+'</option>';
                let htmlMenuEntryTitle = entry;
                htmlHeadEntry += '<div class="headerItemFrame" id="itemFrame';
                htmlHeadEntry += (counter+1);
                htmlHeadEntry += '"><a target = "_blank" class="headerItem" id="item_';
                htmlHeadEntry += entry;
                htmlHeadEntry += '" name = "';
                htmlHeadEntry += entry;
                htmlHeadEntry += '">';
                htmlHeadEntry += entry;
                htmlHeadEntry += '</a></div>';
                htmlHeadEntries.push(htmlHeadEntry);

                htmlMenuEntry={title: htmlMenuEntryTitle, data: entry, type: new Array(), displayName: new Array()}
                gotData.getItem("categories").forEach((category) => {
                    if(category.isHTTPS){begin = "https://"} else {begin = "http://"}
                    htmlMenuEntry.type.push(begin+entry+devider+category.name+domain+deviderPort+category.port);
                    htmlMenuEntry.displayName.push(category.displayName);
                })
                //console.log("super",htmlMenuEntry);
                htmlMenuEntries.push(htmlMenuEntry);

                htmlAdminPanelEntry += ('<tr id="adminItem_'+entry+'"><td style="width:73%" align="left">' +entry+'</td><td><button id="btAdminItemEdit_Server_'+entry+'">Bearbeiten</button></td><td><button id="btAdminItemDelete_Server_'+entry+'">Löschen</button></td></tr><tr><td style="width:100%"><div class="hidden addInformationFrame" id="addServerInformationFrame_'+entry+'">'+buildOptions("Server", entry)+'</div></td></tr>')
                preparedHTMLAdminPanelList += htmlAdminPanelEntry;
                counter++;
            })
        }
        htmlSb.setItem('Server', serverList);
        /*sbNewServerHostName.innerHTML = htmlSb.getItem("Server");*/
        /*sbNewServiceRunsOn.innerHTML = htmlSb.getItem("Server");*/
        let x = document.querySelectorAll(".serverArray")
        x.forEach(one => {
            one.innerHTML = htmlSb.getItem("Server")
        })

        preparedHTMLAdminPanelList += ('</table>') 
        htmlAdminPanel.innerHTML = preparedHTMLAdminPanelList;

        if(gotData.getItem("servers") != null)
        {
            gotData.getItem("servers").forEach((individual) => {
                let entry = individual.name;
                btDelete.push(document.getElementById(("btAdminItemDelete_Server_"+entry)));
                btDelete[btDelete.length-1].addEventListener("click", (data) => deleteData(data))
                btEdit.push(document.getElementById(("btAdminItemEdit_Server_"+entry)));
                //console.log(btEdit[btEdit.length -1], btEdit, document.getElementById(("btAdminItemEdit_Server_"+entry)), ("btAdminItemEdit_Server_"+entry))
                btEdit[btEdit.length -1].addEventListener("click", (data) => edit(data))

                // fill the admin edit fields
                /*fieldEnum[addFrames.indexOf("Server")].forEach(property => {
                    let id = entry+property
                    let object = document.getElementById(id);
                    object.value =  a
                })*/
                let id = entry+"_Server_Name"
                let object = document.getElementById(id);
                object.value = entry;
                id = entry+"_Server_IPAddress";
                object = document.getElementById(id);
                object.valaue = individual.ipAddress;
                id = entry+ "_Server_Location"
                object = document.getElementById(id);
                object.value = individual.location;  
            })
        }
        htmlHeadEntries.forEach((entry) => {
            newHead += entry;
            btEdit
            counter++
        })

        if(gotData.getItem("services"))
        {
            gotData.getItem("services").forEach((thing ) => {
                let one = thing.name;
            })
        }
        if(gotData.getItem("networks"))
        {
            gotData.getItem("networks").forEach((thing ) => {
                let one = thing.name;
                networkList += '<option value="'+one+'">'+one+'</option>';
            })
        }
        htmlSb.setItem("Network", networkList);     
        let y = document.querySelectorAll(".networkArray")
        y.forEach(one => {
            one.innerHTML = htmlSb.getItem("Network")
        })

        if(newHead == "")
        {
            newHead= "no servers";
        }
        htmlHeader.innerHTML = newHead;

        counter = 0;
        if(gotData.getItem("customlinks"))
        {
            gotData.getItem('customlinks').forEach((individual) => {
                let title = individual.name;
                let footEntryId = "footItem_"+(counter+1)
                let ref = individual.ref;
                htmlFootEntry += ('<div class="footerItemFrame"><a target = "_blank" class="footerItem" href="'+ref+'">'+title+'</a></div>');
                counter++;
            })
        }

        if(htmlFootEntry == "")
        {
            htmlFootEntry = "no links";
        }
        htmlFooter.innerHTML = htmlFootEntry + htmlAddFootEntry;
        btAddCustomLink = document.getElementById("btAddCustomLink");
        btAddCustomLink.addEventListener("click", (data)=> {if(addCustomLinkMenuIsOpen){menuAddCustomLink.classList.add("hidden");addCustomLinkMenuIsOpen=false;}else{menuAddCustomLink.classList.remove("hidden");addCustomLinkMenuIsOpen = true;}})

        let newMenu = "";
        counter = 0;
        htmlMenuEntries.forEach((entry) => {
            let offsetWidth;
            if(counter != 0){offsetWidth= document.getElementById(("item_" +(entry.data))).offsetLeft -37;}
            else{offsetWidth = 0;}
            newMenu += '<div class="itemMenu hidden" style ="margin-left:'+offsetWidth+'px" id="menu_' + entry.title +'" name= '+entry.title+'"><div class="linkFrame">';
            secondCounter = 0;
            entry.type.forEach((secondEntry) => {
                newMenu += '<a href="'+entry.type[secondCounter]+'" target = "_blank" class ="link" id="link'+entry.title+'.'+(secondCounter+1) +'">'+entry.displayName[secondCounter]+ '</a>';
                secondCounter++
            })
            newMenu += '</div></div>';
            counter++;
        })
        htmlMenus.innerHTML = newMenu;

        counter = 0;
        htmlHeadEntries.forEach((entry) => {
            let headEntryId = "item_"+serverEnum[counter];
            let headEntry = document.getElementById(headEntryId);
            headEntries.push(headEntry);
            counter++
        })

        headEntries.forEach((entry) =>
        {
            entry.addEventListener("click", (information) => openMenu(information.srcElement));
        });
        
        //console.log("head "+newHead+" foot "+htmlFootEntry)
        let html = '<div id ="locationsMenuFrame"><div id ="locationsMenu">'
        counter = 0;
        gotData.getItem("locations").forEach((location) => {
            let entry = location.name;
            html+= ('<a id = locationEntry_'+counter+ ' class="locationEntry">'+entry+'</a>')
            locationList += '<option value="'+entry+'">'+entry+'</option>';
            counter++;
        })
        html += '</div></div><div id="canvas"></div>';
        drawing.innerHTML =html;
        htmlSb.setItem('Location', locationList);
        //sbNewServerLocation.innerHTML = htmlSb.getItem("Location")
        x = document.querySelectorAll(".LocationArray")
        x.forEach(one => {
            one.innerHTML = htmlSb.getItem("Location")
        })
        document.getElementById(("locationEntry_"+selectedLocation)).classList.add("locationEntrySelected");
        for(let i = 0; i<(counter); i++){
            //console.log( i, ("locationEntry"+i), document.getElementById(("locationEntry"+i)))
            document.getElementById(("locationEntry_"+i)).addEventListener("click", (data) => {onLocationSelectChange(data.path[0].id)});
        }

        createVisualization();
        switchEnabilityOfAllButtons(true);
    }
    
    let addressToBinary = (ipAddress) => {
        let ipSplitted = ipAddress.split(".")
        let total = "";
        ipSplitted.forEach((octate) => {
            //console.log(octate);
            let thisOctate = octate;
            let begin = Number(thisOctate) 
            let chars = "";
            let dividend = 128;
            //console.log(begin, octate)
            for(let counter = 0; counter < 8; counter++)
            {
                if((Math.floor(begin / (Math.floor(dividend / Math.pow(2, counter))))) == 1)
                {
                    chars = chars.concat("1")
                    begin -= (Math.floor(dividend / Math.pow(2, counter)))
                    //console.log("minus ",begin, (Math.floor(dividend / Math.pow(2, counter))))
                }
                else{
                    //console.log("remain")
                    chars = chars.concat("0")
                }
                //console.log(chars, begin, counter, (Math.floor(begin / (Math.floor(dividend / Math.pow(2, counter))))), dividend, ((begin / (dividend / Math.pow(2, counter))) == 1))
                
            }
            total = total.concat(chars+ ".");
        })
        total = total.substring(0,(total.length-1))
        //console.log(total)
        return(total);
    }

    let getSubnetFromAddress = (address, count) => {
        //console.log(address)
        let total = "";
        counter = 0;
        let stringSplitted = address.split(".")
        stringSplitted.forEach((octate) => {
            //console.log(octate)
            let chars = octate.split('');
                chars.forEach((char) => {
                    
                    if(counter <= count)
                    {   counter++;
                        total+= char;
                    }
                    else
                    {
                        total += '0';
                    }
                    //console.log(total, counter)
                })
                
            total += "."
            
        })
        total = total.substring(0,(total.length-1))
        //console.log(Number(names[addFrames.indexOf("Server")][dataEnum[addFrames.indexOf("Server")].data.indexOf("Subnet")]), count, total)
        return total;
    }

    let binaryToAddress = (binary) => {
        let binarySplitted = binary.split(".")
        let total = "";
        binarySplitted.forEach((octate) => {
            let multiplicator = 128;
            let number = 0;
            counter = 1;
            let chars = octate.split('')
            chars.forEach((char) => {
                if(char == '0')
                {

                }
                    
                else
                {
                    number += (multiplicator)
                }
                multiplicator = multiplicator / 2 * counter
            })
            total += (number+".");
        })
        total = total.substring(0,(total.length-1))
        return total;
    }
