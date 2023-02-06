import React from "react";

const Rank = ( { user }) => {
    return (
        <div className="white" style={{clear: 'both', paddingTop: '40px'}}>
            <div className="f3">
                {`${user.name}, you current rank is`}
            </div>
            <div className="f1">
                { `${user.entries}`}
            </div>
        </div>
    )
}

export default Rank;