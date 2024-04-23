import '../App.css'
import { useState, useEffect, useRef } from 'react';
import { genreArr } from '../assets/genres';
import apiService from '../services/ApiServices';
import helpers from '../helpers/helpers';

function Filter({ lineUp, setArtist, filterByHeadliners, setFilterByHeadliners, filterByTop, setFilterByTop, filterByGenre, setFilterByGenre, removedArtists, setNewArtist}) {

  const [filterOptions, setFilterOptions] = useState(false);
  const [genreOptions, setGenreOptions] = useState(false);

  
  const shuffleArtist = () => {
    let index = undefined;
    do index = Math.floor(Math.random() * lineUp.length);
    while (removedArtists.includes(index));
    const artistName = lineUp[index].name;
    setNewArtist(artistName);
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

  const toggleFilterByGenre = (e) => {
    const genreSelected = e.target.innerHTML;
    if (filterByGenre == genreSelected) setFilterByGenre('');
    else setFilterByGenre(genreSelected);
  }

  return (
    <div className="filter-search">
      <p id="shuffle-filter-button" onClick={shuffleArtist}>shuffle</p>
      <p id='shuffle-filter-button' onClick={toggleFilter}>filter</p>

      {filterOptions === true ? 
        <>
          <p className={`filter-option ${filterByGenre ? `selected-filter` : ``}`} onClick={toggleGenreOptions}>By Genre</p>
          
          {genreOptions === true ?
            <>
              {genreArr.map((genre) => <p className={`genre-option ${filterByGenre === genre ? `selected-filter` : ``}`} key={genre} onClick={toggleFilterByGenre}>{genre}</p>)}
            </>
            : <></>}
          
          <p className={`filter-option ${filterByHeadliners ? `selected-filter` : ``}`} onClick={toggleFilterByHeadliners}>By Headliners</p>
          <p className={`filter-option ${filterByTop ? `selected-filter` : ``}`} onClick={toggleFilterByTop}>By My Top 150</p>
        </>
        : <></>}
      
    </div>
  )
}

export default Filter
