import '../App.css'
import { useState, useEffect, useRef } from 'react';


function Filter({ lineUp, getArtist, setArtist, filterByHeadliners, setFilterByHeadliners, filterByTop, setFilterByTop}) {

  const [filterOptions, setFilterOptions] = useState(false);
  const [genreOptions, setGenreOptions] = useState(false);

  // const genres = {
  //   edm,
  //   indie,
  //   rock,
  //   pop,
  //   punk,
  //   rhythm-and-blues-soul: "rnb",
  //   folk,
  //   hip-hop-rap: "hip-hop",
  //   metal,
  //   jazz,
  // };
 
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

  const toggleGenreOptions = () => {
    setGenreOptions(!genreOptions);
  }


  return (
    <div className="filter-search">
      <p id="shuffle-filter-button" onClick={shuffleArtist}>shuffle</p>
      <p id='shuffle-filter-button' onClick={toggleFilter}>filter</p>

      {filterOptions === true ? 
        <>
          <p className="filter-option" onClick={toggleGenreOptions}>By Genre</p>
          {genreOptions === true ?
            <>
              {/* <p className={`genre-option`}>edm</p> */}
 
            </>
            : <></>}
          <p className={`filter-option ${filterByHeadliners ? `selected-filter` : ``}`} onClick={toggleFilterByHeadliners}>By Headliners</p>
          <p className={`filter-option ${filterByTop ? `selected-filter` : ``}`} onClick={toggleFilterByTop}>By My Top 100</p>
        </>
        : <></>}
      
    </div>
  )
}

export default Filter
