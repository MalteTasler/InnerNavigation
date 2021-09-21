class Request
{
    getData(data, callback) {
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
                                console.log(one+" "+one.name)
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

    saveData(data) {
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
                    thing => {console.log("database ",newObject, thing); //reload top level
                
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
}
export default Request