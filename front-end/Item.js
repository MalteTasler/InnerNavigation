class Item{
    constructor(type, names, dataEnum, addFrames){
        console.log(type);
        this.type = type;
        switch(type){
            case 0:
                this.name = names[addFrames.indexOf("Server")][dataEnum[addFrames.indexOf("Server")].data.indexOf("Name")];
                this.ipAddress = names[addFrames.indexOf("Server")][dataEnum[addFrames.indexOf("Server")].data.indexOf("IPAddress")];
                this.HostName = names[addFrames.indexOf("Server")][dataEnum[addFrames.indexOf("Server")].data.indexOf("HostName")];
                this.memberOff = names[addFrames.indexOf("Server")][dataEnum[addFrames.indexOf("Server")].data.indexOf("Network")];
                this.location = names[addFrames.indexOf("Server")][dataEnum[addFrames.indexOf("Server")].data.indexOf("Location")];
            break;
            case 1:
                this.name = names[addFrames.indexOf("Category")][dataEnum[addFrames.indexOf("Category")].data.indexOf("Name")];
                this.displayName = names[addFrames.indexOf("Category")][dataEnum[addFrames.indexOf("Category")].data.indexOf("DisplayName")];
                this.isHTTPS = names[addFrames.indexOf("Category")][dataEnum[addFrames.indexOf("Category")].data.indexOf("isHTTPS")];
                this.port = names[addFrames.indexOf("Category")][dataEnum[addFrames.indexOf("Category")].data.indexOf("Port")];
            break;
            case 2:
                this.name = names[addFrames.indexOf("Network")][dataEnum[addFrames.indexOf("Network")].data.indexOf("Name")];
                this.subnetOff = names[addFrames.indexOf("Network")][dataEnum[addFrames.indexOf("Network")].data.indexOf("SubnetOff")];
            break;
            case 3:
                this.name = names[addFrames.indexOf("Service")][dataEnum[addFrames.indexOf("Service")].data.indexOf("Name")];
                this.displayName = names[addFrames.indexOf("Service")][dataEnum[addFrames.indexOf("Service")].data.indexOf("DisplayName")];
                this.runsOn = names[addFrames.indexOf("Service")][dataEnum[addFrames.indexOf("Service")].data.indexOf("RunsOn")];
            break;
            case 4:
                this.name = names[addFrames.indexOf("Location")][dataEnum[addFrames.indexOf("Location")].data.indexOf("Name")];
                this.number = names[addFrames.indexOf("Location")][dataEnum[addFrames.indexOf("Location")].data.indexOf("Number")];
                this.street = names[addFrames.indexOf("Location")][dataEnum[addFrames.indexOf("Location")].data.indexOf("Street")];
                this.zip = names[addFrames.indexOf("Location")][dataEnum[addFrames.indexOf("Location")].data.indexOf("ZIP")];
                this.city = names[addFrames.indexOf("Location")][dataEnum[addFrames.indexOf("Location")].data.indexOf("City")];
                this.country = names[addFrames.indexOf("Location")][dataEnum[addFrames.indexOf("Location")].data.indexOf("Country")];
            break;
            case 5:
                this.name = names[addFrames.indexOf("CustomLink")][dataEnum[addFrames.indexOf("CustomLink")].data.indexOf("Name")];
                this.ref = names[addFrames.indexOf("CustomLink")][dataEnum[addFrames.indexOf("CustomLink")].data.indexOf("Ref")];
            break; // !! enums
        }
    }
    getObject() {
        //console.log("get object");
        switch(this.type)
        {
            
            case 0:
                return({"Name":this.name, "MemberOff": this.memberOff, "IPAddress":this.ipAddress, "VirtualHost":this.HostName, "x":373, "y":56, "Room":"R1", "Sector": "EG", "Location":this.location})
            case 1:
                return({"Name":this.name, "DisplayName": this.displayName, /*"isHTTPS":this.isHTTPS,*/ "Port":this.port})
            case 2:
                return({"Name":this.name, "SubnetOff": this.subnetOff})
            case 3:
                return({"Name": this.name, "DisplayName": this.displayName, "RunsOn": this.runsOn})
            case 4:
                return({"Name": this.name, "Ref": this.ref})
        }
    }
}
export default Item