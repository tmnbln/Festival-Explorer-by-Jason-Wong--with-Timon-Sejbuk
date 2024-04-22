import { useState } from "react";
import apiService from "../services/ApiServices";
import searchIcon from '../assets/search.svg'

function Search({ getFestival, setFestival }) {

  const [searchValue, setSearchValue] = useState('');

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    apiService.getFestival(searchValue, setFestival)
  }

  return (
    <div className="Login">
      <div className="login-container">
        <div className="festify-title-container">
         <h1 className="festify-title">festify</h1>
        </div>
        <div className="login-text-container">
          <h2>step 2</h2>
          <h3>enter a festival name</h3>
          <div id="search-container">
            <img src={searchIcon}></img>
            <form onSubmit={searchSubmit}>
              <input type="text" value={searchValue} onChange={searchHandler} placeholder="SEARCH"></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
