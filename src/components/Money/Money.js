import React from "react";
import './Money.css';

const Money = (props) => {
    const handleChange = e => {
        props.handleBaseValueChange(e.target.value);
    }
    return (
        <div className="valueContainer">
            <h2 className="symbol">{props.symbol}</h2>
            <input type="number" id="number" value={props.baseValue} onChange={handleChange}></input>
        </div>
    )
}

export default Money;