import '../App.css'
import { useState, useEffect } from 'react';
import Filter from './Filter';
import { genreObj } from '../assets/genres';
import apiService from '../services/ApiServices';

function LineUp({artist, lineUp, setArtist, topArtists, removedArtists, setRemovedArtists}) {
  
  const [filterByHeadliners, setFilterByHeadliners] = useState(false);
  const [filterByTop, setFilterByTop] = useState(false);
  const [filterByGenre, setFilterByGenre] = useState('');

  let name = undefined
  if(artist) name = artist.name.toString().toLowerCase();
  
  const selectArtist = (e) => {
    apiService.getArtist(e.target.id, setArtist);
    console.log(e.target.innerHTML, name)
  }
  
  const removeArtist = (e) => {
    setRemovedArtists([...removedArtists, Number(e.target.id)]);
  }
  const addArtist = (e) => {
    setRemovedArtists(removedArtists.filter(x => x!= Number(e.target.id)));
  }
  
  // FILTER LINE UP 
  if (filterByHeadliners) lineUp = lineUp.filter(artist => artist.isHeadliner);
  if (filterByTop) lineUp = lineUp.filter(artist => topArtists.includes(artist.name));
  if (filterByGenre != '') lineUp = lineUp.filter(artist => artist.genre.includes(genreObj[filterByGenre]));
  
  
  return (
    <>
      <Filter lineUp={lineUp} setArtist={setArtist} filterByHeadliners={filterByHeadliners} setFilterByHeadliners={setFilterByHeadliners} filterByTop={filterByTop} setFilterByTop={setFilterByTop} filterByGenre={ filterByGenre } setFilterByGenre={setFilterByGenre} removedArtists={removedArtists} />
    <div className="lineup">
      {lineUp.length === 0 ? <></> :
        <div>
          {lineUp.map((artist, index) =>
            <>
              <div key={artist.id} className="artist-item">
                <span className={removedArtists.includes(index) ? "artist-deleted" : null}>
                <p className={artist.name.toString().toLowerCase() == name ? "artist-selected" : "artist-name"}  onClick={selectArtist} id={artist.name} key={artist.performerId}>{artist.name}</p>
                </span>
                {artist.name.toString().toLowerCase() == name && !removedArtists.includes(index)  ? <p className="add-remove" id={index} onClick={removeArtist}> remove </p> : <></>}
                {artist.name.toString().toLowerCase() == name && removedArtists.includes(index)  ? <p className="add-remove" id={index} onClick={addArtist}> add </p> : <></>}
                {/* <p> {removedArtists.includes(index) ? "DELETED" : ""}</p> */}
              </div>
            
            </>
          )}
        </div>
      }   
      </div>
      </>
  )
}

export default LineUp
