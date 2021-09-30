import React from 'react'
class Square extends React.Component{
    constructor(properties)
    {
        super(properties)
        this.state ={   horizontalAmount: properties.horizontalAmount,
                        mode: properties.mode,
                        superMode: properties.superMode,
                        superModeIs: properties.modeIs, 
                        adminMode:properties.adminMode,
                        icons: [null, null, 'I', '🗑', '🚾'],
                        isHovered: false,
                        x:properties.x, 
                        y:properties.y
                    }
        
    }
    static getDerivedStateFromProps = (props, state) => {
        //console.log(state, props)
        return(props)
    }
    build= (data) => {
        let className = data.target.className;
        let classes = className.split(' ');
        let parentClassName = data.target.parentNode.className;
        let parentClasses = parentClassName.split(' ');
        console.log("hover", data.target, classes, parentClasses[1]);
        if(parentClasses[1] == "betweenSquare"){

        }
        else if(parentClasses[1] == "lineSquare")
        {

        }
    }
    hover = (data) => {
        let className = data.target.className;
        let classes = className.split(' ');
        let parentClassName = data.target.parentNode.className;
        let parentClasses = parentClassName.split(' ');
        console.log("hover", data.target, classes, parentClasses[1]);
        if(parentClasses[1] == "betweenSquare")
        {
            console.log("not line")
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
        else if(parentClasses[1] == "lineSquare")
        {
            console.log("line")
        }
        this.setState({isHovered: true})
    }
    endHover = (data) => {
        console.log("end hover ",data.target);
        let className = data.target.className;
        let classes = className.split(' ');
        let parentClassName = data.target.parentNode.className;
        let parentClasses = parentClassName.split(' ');
        console.log("hover", data.target, classes);
        if(parentClasses[1] == "betweenSquare")
        {
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
        else if(parentClasses[1] == "lineSquare")
        {
            
        }
        this.setState({isHovered: false})
    }
    render () {
        console.log("render boxes" + this.state.superModeIs(), this.state.mode)
        if(this.state.superModeIs() == 0)
        {
            let classes = "square"
            if(this.state.adminMode) classes+= " lineSquare"
            
            if(this.state.adminMode)
                return  <div className={classes} onClick={(data) => {this.build(data)}}>
                            {
                                (this.state.mode != 0 && this.state.isHovered) ? 
                                <div style={{position:'absolute'}}><div style={{margin:'2px', fontSize:24, textAlign:'center', color:'black'}}>{this.state.icons[this.state.mode]}</div></div> : 
                                ''
                            }
                            <div className="leftTop" onMouseOver={(data)=> {this.hover(data)}} onMouseOut={(data) => {this.endHover(data)}}></div>
                            <div className="rightTop" onMouseOver={(data)=> {this.hover(data)}} onMouseOut={(data) => {this.endHover(data)}}></div>
                            <div className = "leftBottom" onMouseOver={(data)=> {this.hover(data)}} onMouseOut={(data) => {this.endHover(data)}}></div>
                            <div className="rightBottom" onMouseOver={(data)=> {this.hover(data)}} onMouseOut={(data) => {this.endHover(data)}}></div>
                        </div>
            else
                return  <div className={classes}>
                            <div className="leftTop" onMouseOver={(data)=> {this.hover(data)}} onMouseOut={(data) => {this.endHover(data)}}></div>
                            <div className="rightTop" onMouseOver={(data)=> {this.hover(data)}} onMouseOut={(data) => {this.endHover(data)}}></div>
                            <div className = "leftBottom" onMouseOver={(data)=> {this.hover(data)}} onMouseOut={(data) => {this.endHover(data)}}></div>
                            <div className="rightBottom" onMouseOver={(data)=> {this.hover(data)}} onMouseOut={(data) => {this.endHover(data)}}></div>
                        </div>
        }
        else
        {
            var leftTop = "leftTop rBottom "+(this.state.x+(Math.floor((this.state.x) / this.state.horizontalAmount)));
            var rightTop = "rightTop lBottom "+(this.state.x+1+(Math.floor((this.state.x) / this.state.horizontalAmount)));
            var leftBottom = "leftBottom rTop "+(this.state.x+this.state.horizontalAmount+1+(Math.floor((this.state.x) / this.state.horizontalAmount)));
            var rightBottom = "rightBottom lTop "+(this.state.x+this.state.horizontalAmount+1+1+(Math.floor((this.state.x) / this.state.horizontalAmount)));
            
            return  <div className="square betweenSquare">
                        {
                            (this.state.isHovered) ? 
                            <div style={{position:'absolute'}}><div style={{margin:'2px', fontSize:24, textAlign:'center', color:'black'}}>{this.state.icons[this.state.mode]}</div></div> : 
                            ''
                        }
                        <div className={leftTop} onMouseOver={(data) => this.hover(data)} onMouseOut={(data) => {this.endHover(data)}}></div>
                        <div className={rightTop} onMouseOver={(data) => this.hover(data)} onMouseOut={(data) => {this.endHover(data)}}></div>
                        <div className = {leftBottom} onMouseOver={(data) => this.hover(data)} onMouseOut={(data) => {this.endHover(data)}}></div>
                        <div className={rightBottom} onMouseOver={(data) => this.hover(data)} onMouseOut={(data) => {this.endHover(data)}}></div>
                    </div>
        }
    }
}
export default Square