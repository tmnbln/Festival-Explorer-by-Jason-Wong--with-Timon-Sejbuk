import '../App.css'
import { useState } from 'react';
import { genreArr } from '../assets/genres';

function Filter({ props }) {

  // destructure props 
  let { lineUp, setNewArtist, filterByHeadliners, setFilterByHeadliners, filterByTop, setFilterByTop, filterByGenre, setFilterByGenre, removedArtists} = props


  // initialise use states
  const [filterOptions, setFilterOptions] = useState(false);
  const [genreOptions, setGenreOptions] = useState(false);


  // set new artist based on random index generated // do not select already removed artists
  const shuffleArtist = () => {
    let index = undefined;
    do index = Math.floor(Math.random() * lineUp.length);
    while (removedArtists.includes(index));
    const artistName = lineUp[index].name;
    setNewArtist(artistName);
  }


  // toggle to view filter options
  const toggleFilter = () => {
    setFilterOptions(!filterOptions);
  }
  

  // toggle to view genre options 
  const toggleGenreOptions = () => {
    setGenreOptions(!genreOptions);
  }


  // toggle filter by headliners 
  const toggleFilterByHeadliners = () => {
    setFilterByHeadliners(!filterByHeadliners);
  }


  // toggle filter by top artists 
  const toggleFilterByTop = () => {
    setFilterByTop(!filterByTop);
  }
  

  // toggle filter by genre 
  const toggleFilterByGenre = (e) => {
    const genreSelected = e.target.innerHTML;
    if (filterByGenre == genreSelected) setFilterByGenre('');
    else setFilterByGenre(genreSelected);
  }

  return (
    <div className="filter-search">
      <p id="shuffle-filter-button" onClick={shuffleArtist}>shuffle</p>
      <p id='shuffle-filter-button' onClick={toggleFilter}>filter</p>

      {filterOptions && <>
        <p className={`filter-option ${filterByGenre ? `selected-filter` : ``}`} onClick={toggleGenreOptions}>By Genre</p>
          
        {genreOptions && <>
          {genreArr.map((genre) =>
            <p className={`genre-option ${filterByGenre === genre ? `selected-filter` : ``}`} key={genre} onClick={toggleFilterByGenre}>{genre}</p>)}
          </>
        }
          <p className={`filter-option ${filterByHeadliners ? `selected-filter` : ``}`} onClick={toggleFilterByHeadliners}>By Headliners</p>
          <p className={`filter-option ${filterByTop ? `selected-filter` : ``}`} onClick={toggleFilterByTop}>By My Top 150</p>
        </>
      }
    </div>
  )
}

export default Filter
