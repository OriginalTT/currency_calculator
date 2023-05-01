import React, { useState } from "react";
import './CurrencyTag.css';

const CurrencyTagA = (props) => {
    const { code, symbol } = props.country;

    const handleButtonClick = () => {
        props.toggleDisplayOption();
    }

    return (
        <div>
            <button className="option" type="button" onClick={handleButtonClick}>{props.displayIndicator}</button>
            <div className="currencyTag typeA">
                <h2>{code}</h2>
                <h1>{symbol}</h1>
            </div>
        </div>
    )
}

export default CurrencyTagA;