import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './style.css';

function App() {
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

      <CountriesList />
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

function CountriesList() {
  return (
    <section>
      <ul className="countries-list flex">
        <CountryTile />
        <CountryTile />
      </ul>
    </section>
  );
}

function CountryTile() {
  return (
    <div className="country flex">
      <div className="country__flag"></div>
      <div className="country__info">
        <h2>Country</h2>
        <ul>
          <li>
            <span>Population: </span>32532352
          </li>
          <li>
            <span>Region: </span>Europe
          </li>
          <li>
            <span>Capital: </span>Berlin
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
