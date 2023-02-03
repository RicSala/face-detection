import React from "react";

const Input = ( { onInputChange, onButtonSubmit }) => {
    return (
            <div className="pa4 black-80 w-100" style={{ clear: "both" }}>
            <div className="measure" style={{margin: "auto"}}>
            <label className="f6 b db mb2">Image Url <span className="normal black-60">(Mandatory)</span></label>
                <input id="name"
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    onChange={ onInputChange }
                    />
            <small id="name-desc" className="f6 black-60 db mb2">Introduce an image url the detect faces</small>
            </div>
            <button className="pa2 f4 dim pointer bg-light-purple bn white w-30"
                    onClick={onButtonSubmit}>Detect!</button>
                
            </div>
    )
}

export default Input;