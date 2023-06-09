import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './style.css';

function App() {
  const getThemeValue = () => localStorage.getItem('theme');

  const [countries, setCountries] = useState([]);
  const [currentRegion, setCurrentRegion] = useState('All');
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(getThemeValue());

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
  }, [currentRegion, query]);

  useEffect(() => {
    if (theme === 'light-theme') {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  return (
    <>
      <header className="flex">
        <h1>Where in the world?</h1>
        <button className="btn flex" onClick={handleThemeChange}>
          {theme === 'light-theme' ? (
            <FontAwesomeIcon icon={faMoon} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faSun} size="lg" />
          )}
          Switch Mode
        </button>
      </header>

      <Navigation
        currentRegion={currentRegion}
        setCurrentRegion={setCurrentRegion}
        setQuery={setQuery}
      />

      <CountriesList countries={countries} query={query} />
    </>
  );
}

function Navigation({ currentRegion, setCurrentRegion, setQuery }) {
  return (
    <form className="search-form flex">
      <SearchBox setQuery={setQuery} />
      <FilterSelect
        currentRegion={currentRegion}
        setCurrentRegion={setCurrentRegion}
      />
    </form>
  );
}

function SearchBox({ setQuery }) {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size="lg"
        className="icon-glass"
      />
    </div>
  );
}

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
function FilterSelect({ currentRegion, setCurrentRegion }) {
  const handleChange = (e) => {
    setCurrentRegion(e.target.value);
  };

  return (
    <select defaultValue={currentRegion} onChange={handleChange}>
      <option value="All" disabled={true} hidden={true}>
        Filter by Region
      </option>
      <option value="All">All</option>
      {REGIONS.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
}

function CountriesList({ countries, query }) {
  return (
    <section>
      <div className="grid-wrapper">
        <ul className="countries-list grid">
          {countries
            .filter((item) =>
              query.toLowerCase() === ''
                ? item
                : item.name.common.toLowerCase().startsWith(query)
            )
            .map((country) => (
              <CountryTile key={country.name.common} countryObj={country} />
            ))}
        </ul>
      </div>
    </section>
  );
}

function CountryTile({ countryObj }) {
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
            {countryObj.population.toLocaleString('en-US')}
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
