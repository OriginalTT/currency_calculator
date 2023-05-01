import React from "react";
import './Result.css';

const Result = (props) => {
    return (
        <div className="resultContainer">
            <h2>{props.symbol}</h2>
            <h2>{props.value}</h2>
        </div>
    )
}

export default Result;