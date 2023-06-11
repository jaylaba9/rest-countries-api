import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './style.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [currentRegion, setCurrentRegion] = useState('All');
  useEffect(() => {
    fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags'
    )
      .then((response) => response.json())
      .then((data) => {
        if (currentRegion !== 'All') {
          const filteredData = data.filter(
            (country) => country.region === currentRegion
          );
          setCountries(filteredData);
        } else {
          setCountries(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [currentRegion]);

  return (
    <>
      <header className="flex">
        <h1>Where in the world?</h1>
        <button className="btn flex">
          <FontAwesomeIcon icon={faMoon} size="lg" />
          Dark Mode
        </button>
      </header>

      <Navigation />

      <CountriesList countries={countries} setCountries={setCountries} />
    </>
  );
}

function Navigation() {
  return (
    <form className="search-form flex">
      <SearchBox />
      <FilterSelect />
    </form>
  );
}

function SearchBox() {
  return (
    <div className="input-wrapper">
      <input type="text" placeholder="Search for a country..."></input>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size="lg"
        className="icon-glass"
      />
    </div>
  );
}

function FilterSelect() {
  return (
    <select>
      <option value="">Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}

function CountriesList({ countries, setCountries }) {
  return (
    <section>
      <div className="grid-wrapper">
        <ul className="countries-list grid">
          {countries.map((country) => (
            <CountryTile
              key={country.name.common}
              countryObj={country}
              setCountries={setCountries}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function CountryTile({ countryObj, setCountries }) {
  return (
    <div className="country flex">
      <div
        className="country__flag"
        style={{ backgroundImage: `url(${countryObj.flags.svg})` }}
      ></div>
      <div className="country__info">
        <h2>{countryObj.name.common}</h2>
        <ul>
          <li>
            <span>Population: </span>
            {countryObj.population}
          </li>
          <li>
            <span>Region: </span>
            {countryObj.region}
          </li>
          <li>
            <span>Capital: </span>
            {countryObj.capital[0]}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
