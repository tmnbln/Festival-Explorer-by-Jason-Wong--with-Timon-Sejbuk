import '../App.css'
import { useState, useEffect, useRef } from 'react';


function Filter({ lineUp, getArtist, setArtist, filterByHeadliners, setFilterByHeadliners, filterByTop, setFilterByTop}) {

  const [filterOptions, setFilterOptions] = useState(false);
  
  const shuffleArtist = () => {
    const index = Math.floor(Math.random() * lineUp.length);
    getArtist(lineUp[index].name, setArtist);
  }

  const toggleFilter = () => {
    setFilterOptions(!filterOptions);
  }

  const toggleFilterByHeadliners = () => {
    setFilterByHeadliners(!filterByHeadliners);
  }

  const toggleFilterByTop = () => {
    setFilterByTop(!filterByTop);
  }


  return (
    <div className="filter-search">
      <p id="shuffle-filter-button" onClick={shuffleArtist}>shuffle</p>
      <p id='shuffle-filter-button' onClick={toggleFilter}>filter</p>

      {filterOptions === true ? 
        <>
          <p className="filter-option">By Genre</p>
          <p className={`filter-option ${filterByHeadliners ? `selected-filter` : ``}`} onClick={toggleFilterByHeadliners}>By Headliners</p>
          <p className={`filter-option ${filterByTop ? `selected-filter` : ``}`} onClick={toggleFilterByTop}>By My Top 100</p>
        </>
        : <></>}
      
    </div>
  )
}

export default Filter
