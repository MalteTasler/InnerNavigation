import React from 'react'
class Square extends React.Component{
    constructor(properties)
    {
        super(properties)
        this.state = {mode: properties.mode, modeIs: properties.modeIs, x:properties.x, y:properties.y}
    }
    hover = (data) => {
        let className = data.target.className;
        let classes = className.split(' ');
        console.log("hover", data.target, classes);
        let leftTop = document.getElementsByClassName(("lTop "+classes[2]))[0];
        let rightTop = document.getElementsByClassName(("rTop "+classes[2]))[0];
        let leftBottom = document.getElementsByClassName(("lBottom "+classes[2]))[0];
        let rightBottom = document.getElementsByClassName(("rBottom "+classes[2]))[0];
        console.log(leftTop, rightTop, leftBottom);
        if(leftTop ) leftTop.style.borderLeft = "solid 2px lightgray"
        if(leftTop) leftTop.style.borderTop = "solid 2px lightgray"
        if(rightTop) rightTop.style.borderRight = "solid 2px lightgray"
        if(rightTop) rightTop.style.borderTop = "solid 2px lightgray"
        if(leftBottom) leftBottom.style.borderBottom = "solid 2px lightgray"
        if(leftBottom) leftBottom.style.borderLeft = "solid 2px lightgray"
        if(rightBottom) rightBottom.style.borderRight = "solid 2px lightgray"
        if(rightBottom) rightBottom.style.borderBottom = "solid 2px lightgray"
    }
    endHover = (data) => {
        console.log("end hover ",data.target);
        let className = data.target.className;
        let classes = className.split(' ');
        console.log("hover", data.target, classes);
        let leftTop = document.getElementsByClassName(("lTop "+classes[2]))[0];
        let rightTop = document.getElementsByClassName(("rTop "+classes[2]))[0];
        let leftBottom = document.getElementsByClassName(("lBottom "+classes[2]))[0];
        let rightBottom = document.getElementsByClassName(("rBottom "+classes[2]))[0];
        if(leftTop ) leftTop.style.borderLeft = ""
        if(leftTop) leftTop.style.borderTop = ""
        if(rightTop) rightTop.style.borderRight = ""
        if(rightTop) rightTop.style.borderTop = ""
        if(leftBottom) leftBottom.style.borderBottom = ""
        if(leftBottom) leftBottom.style.borderLeft = ""
        if(rightBottom) rightBottom.style.borderRight = ""
        if(rightBottom) rightBottom.style.borderBottom = ""
    }
    render () {
        console.log("render boxes" + this.state.modeIs())
        if(this.state.modeIs() == 0)
            return <div className="square lineSquare"><div className="leftTop"></div><div className="rightTop"></div><div className = "leftBottom"></div><div className="rightBottom"></div></div>
        else
        {
            var leftTop = "leftTop rBottom "+(this.state.x+(Math.floor((this.state.x) / 12)));
            var rightTop = "rightTop lBottom "+(this.state.x+1+(Math.floor((this.state.x) / 12)));
            var leftBottom = "leftBottom rTop "+(this.state.x+12+1+(Math.floor((this.state.x) / 12)));
            var rightBottom = "rightBottom lTop "+(this.state.x+12+1+1+(Math.floor((this.state.x) / 12)));
            
            return <div className="square betweenSquare"><div className={leftTop} onMouseOver={(data) => this.hover(data)} onMouseOut={(data) => {this.endHover(data)}}></div><div className={rightTop} onMouseOver={(data) => this.hover(data)} onMouseOut={(data) => {this.endHover(data)}}></div><div className = {leftBottom} onMouseOver={(data) => this.hover(data)} onMouseOut={(data) => {this.endHover(data)}}></div><div className={rightBottom} onMouseOver={(data) => this.hover(data)} onMouseOut={(data) => {this.endHover(data)}}></div></div>
        }
    }
}
export default Square