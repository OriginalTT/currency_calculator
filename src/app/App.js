import './App.css';
import React, { useState, useEffect } from 'react';
import CountryListA from '../components/CurrencyList/CountryListA';
import CountryListB from '../components/CurrencyList/CountryListB';
import CurrencyTagA from '../components/CurrencyTag/CurrencyTagA';
import CurrencyTagB from '../components/CurrencyTag/CurrencyTagB';
import Money from '../components/Money/Money';
import Result from '../components/Result/Result';

function App() {
  const key = "API key from FreecurrencyAPI";

  const expandMore = (<span class="material-symbols-outlined">
    expand_more
  </span>);
  const expandLess = (<span class="material-symbols-outlined">
    expand_less
  </span>)

  const [selectedCountries, setSelectedCountries] = useState([{ code: "EUR", name: "Euro", symbol: "€" }, { code: "USD", name: "US Dollar", symbol: "$" }])
  const [displayOptionA, setDisplayOptionA] = useState(false);
  const [displayIndicatorA, setDisplayIndicatorA] = useState(expandMore);
  const [displayOptionB, setDisplayOptionB] = useState(false);
  const [displayIndicatorB, setDisplayIndicatorB] = useState(expandMore);
  const [countryList, setCountryList] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [baseValue, setBaseValue] = useState(1);
  const [resultValue, setResultValue] = useState(0);

  const toggleDisplayOptionA = () => {
    if (displayOptionB) {
      setDisplayOptionA(true);
      setDisplayOptionB(false);
    } else if (!displayOptionA) {
      setDisplayOptionA(true);
    } else {
      setDisplayOptionA(false);
    }
  };

  const toggleDisplayOptionB = () => {
    if (displayOptionA) {
      setDisplayOptionB(true);
      setDisplayOptionA(false);
    } else if (!displayOptionB) {
      setDisplayOptionB(true);
    } else {
      setDisplayOptionB(false);
    }
  };

  const handleBaseValueChange = (newValue) => {
    setBaseValue(Number(newValue));
  };

  const handleSelectedCountryChangeA = (newCountry) => {
    setSelectedCountries((prev) => [newCountry, prev[1]]);
  }

  const handleSelectedCountryChangeB = (newCountrty) => {
    setSelectedCountries((prev) => [prev[0], newCountrty]);
  }

  useEffect(() => {
    fetch("https://api.freecurrencyapi.com/v1/currencies", {
      method: "GET",
      headers: {
        apikey: key
      }
    }).then(response => response.json())
      .then(data => {
        const newCountryList = [];
        const countryData = data.data;
        console.log(countryData)
        for (const key in countryData) {
          newCountryList.push({ code: countryData[key].code, symbol: countryData[key].symbol_native, name: countryData[key].name, decimal: countryData[key].decimal_digits });
        }
        setCountryList(newCountryList);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.freecurrencyapi.com/v1/latest?base_currency=${selectedCountries[0].code}`, {
      method: "GET",
      headers: {
        apikey: key
      }
    }).then(response => response.json())
      .then(data => {
        setExchangeRates(data);
      })
  }, [selectedCountries]);

  useEffect(() => {
    if (exchangeRates && exchangeRates.data) {
      const countryCode = selectedCountries[1].code;
      setResultValue(
        (baseValue * exchangeRates.data[countryCode]).toFixed(selectedCountries[1].decimal)
      );
    }
  }, [baseValue, selectedCountries]);

  useEffect(() => {
    if (displayOptionA) {
      setDisplayIndicatorA(expandLess);
    } else {
      setDisplayIndicatorA(expandMore);
    }
    if (displayOptionB) {
      setDisplayIndicatorB(expandLess);
    } else {
      setDisplayIndicatorB(expandMore);
    }
  }, [displayOptionA, displayOptionB])

  return (
    <>
      <h1>Currency Calculator</h1>
      <div>
        <CountryListA
          displayOption={displayOptionA}
          countryList={countryList}
          handleSelectedCountry={handleSelectedCountryChangeA} />
        <CountryListB
          displayOption={displayOptionB}
          countryList={countryList}
          handleSelectedCountry={handleSelectedCountryChangeB} />
        <div className='main'>
          <div>
            <CurrencyTagA
              country={selectedCountries[0]}
              toggleDisplayOption={toggleDisplayOptionA}
              displayIndicator={displayIndicatorA}
            />
            <Money
              baseValue={baseValue}
              handleBaseValueChange={handleBaseValueChange}
              symbol={selectedCountries[0].symbol}
            />
          </div>
          <h1>>></h1>
          <div>
            <CurrencyTagB
              country={selectedCountries[1]}
              toggleDisplayOption={toggleDisplayOptionB}
              displayIndicator={displayIndicatorB}
            />
            <Result
              symbol={selectedCountries[1].symbol}
              value={resultValue} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
