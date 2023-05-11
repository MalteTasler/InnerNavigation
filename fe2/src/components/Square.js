import React from 'react'
class Square extends React.Component{
    constructor(properties)
    {
        super(properties)
        this.state = {mode: properties.mode, modeIs: properties.modeIs}
    }
    render () {
        console.log("render boxes" + this.state.modeIs())
        if(this.state.modeIs() == 0)
            return <div className="square lineSquare"><div className="leftTop"></div><div className="rightTop"></div><div className = "leftBottom"></div><div className="rightBottom"></div></div>
        else
            return <div className="square betweenSquare"><div className="leftTop"></div><div className="rightTop"></div><div className = "leftBottom"></div><div className="rightBottom"></div></div>
    }
}
export default Square