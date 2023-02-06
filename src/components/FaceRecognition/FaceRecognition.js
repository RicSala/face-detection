import React from "react";

const FaceRecognition = ( { faceBoxes, imageUrl } ) => {
    return (
        <div style={{ width: "500px", margin: "auto", position:"relative", marginBottom:"50px"}}>
            <img src={ imageUrl || "" } alt="faces to detect" style={{display: imageUrl ? 'block' : 'none'}} />
            <div className="boundingBox"
                style={{ display: imageUrl ? 'block' : 'none', position: "absolute", top: `${faceBoxes.top}`, left: `${faceBoxes.left}`, width: `${faceBoxes.width}`, height: `${faceBoxes.height}`, border: "3px solid red" }}></div>
            
     </div>
 )

}

export default FaceRecognition;

