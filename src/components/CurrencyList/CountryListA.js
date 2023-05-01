import './CountryList.css';
import React from "react";

const CountryList = (props) => {
    const {countryList, displayOption} = props;

    const handleClick = (country) => {
        props.handleSelectedCountry(country);
    }

    const options = (
        <div className='countryOptionContainer'>
            {countryList.map(currency => {
                return (
                    <div key={currency.code} className="countryOption typeA" onClick={() => handleClick(currency)}>
                        <h1>{currency.symbol}</h1>
                        <h2>{currency.code}</h2>
                    </div>
                )
            })}
        </div>
    )

    return displayOption ? options : <div></div>
}

export default CountryList;