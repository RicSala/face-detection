import React from "react";
import Tilt from 'react-parallax-tilt';



const Logo = () => {

    return (
        <Tilt className="fl" style={{width: '250px'}}>
            <div className="white bg-dark-green pa1 h4 flex flex-wrap ma3  shadow-2">
                <h1 className="h-100">Find That Face! 👀</h1>
            </div>
        </Tilt>

    )

}

export default Logo;