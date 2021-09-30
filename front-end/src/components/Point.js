import React from "react";

class Point extends React.Component{
    /*constructor(x,y, name, counter)
    {
        let image = document.getElementById("image");
        this.xCenter = x;
        this.yCenter = y;
        let innerHTML = ('<div id ="serverPoint_'+counter+'" class="serverPoint" style="position:relative; left:'+this.xCenter+'px; bottom:'+this.yCenter+'px;" /><span class="tooltip">'+name+'<br />x: <span style="text-size:3px;">'+this.xCenter+'</span><br />y: <span style="text-size"3px;">'+this.yCenter+'</span></span>')
        this.DOM = document.getElementById(('serverPoint_'+counter));
        //console.log(this.DOM)
        
    }
    hasCoordinates(x,y)
    {
        return((this.x == x && this.y == y))
    }
    remove(counter)
    {
        let point = document.getElementById("serverPoint_"+counter)
        point.parentNode.removeChild(point);
    }*/
    render(x, y, name, counter) {
        return '<div><div id ="serverPoint_{counter}+" class="serverPoint" style="position:relative; left:{x}px; bottom:{y}px;" /><span class="tooltip">{name}<br />x: <span style="text-size:3px;">{x}</span><br />y: <span style="text-size"3px;">{y}</span></span></div>'
    }
}
export default Point