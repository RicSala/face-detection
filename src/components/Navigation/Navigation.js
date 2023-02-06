import React from "react";

const Navigation = ( { onRouteChange, isSignedIn, signOut } ) => {
    

    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', float: 'right' }} onClick={() => { signOut();  onRouteChange('signin') }}>
            <p className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </nav>
                
            )
    } else {
        
        return (

            <div>
            <nav style={{ display: 'flex', float: 'right' }} onClick={() => onRouteChange('signin')}>
            <p className="f3 link dim black underline pa3 pointer">Sign in</p>
             </nav>
            <nav style={{ display: 'flex', float: 'right' }} onClick={() => onRouteChange('register')}>
            <p className="f3 link dim black underline pa3 pointer">Register</p>
             </nav>
            </div>

            
        )
         

        }


}

export default Navigation;