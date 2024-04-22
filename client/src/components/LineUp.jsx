import '../App.css'
import { useState, useEffect } from 'react';
import Filter from './Filter';
import { genreObj } from '../assets/genres';
import apiService from '../services/ApiServices';
import helpers from '../helpers/helpers';

function LineUp({artist, lineUp, setArtist, topArtists, removedArtists, setRemovedArtists, setTracks, setRelatedArtists}) {
  
  const [filterByHeadliners, setFilterByHeadliners] = useState(false);
  const [filterByTop, setFilterByTop] = useState(false);
  const [filterByGenre, setFilterByGenre] = useState('');

  const cleanStr = helpers.cleanStr;

  if (topArtists) topArtists = topArtists.map(artist => cleanStr(artist));

  let name = undefined
  if (artist) name = cleanStr(artist.name);

  const selectArtist = async (e) => {
    apiService.getArtist(e.target.id, (data) => setArtist(data));
    // apiService.getArtistTracks(artist.id, (data) => setTracks(data));
    // apiService.getRelatedArtists(artist.id, (data) => setRelatedArtists (data));
     
    // apiService.getArtist2(e.target.id).then(async (data) => {
    //   await apiService.getArtistTracks(data.id, setTracks)
    //   setArtist(data);
    // })

    // const promise1 = apiService.getArtist(e.target.id);
    // const promise2 = apiService.getArtistTracks(artist.id, setTracks);
    // const promise3 = apiService.getRelatedArtists(artist.id, setRelatedArtists);
    // return Promise.all(promise1, promise2, promise3);
  }
  
  const removeArtist = (e) => {
    setRemovedArtists([...removedArtists, Number(e.target.id)]);
  }
  const addArtist = (e) => {
    setRemovedArtists(removedArtists.filter(x => x!= Number(e.target.id)));
  }
  
  // FILTER LINE UP 
  if (filterByHeadliners) lineUp = lineUp.filter(artist => artist.isHeadliner);
  if (filterByTop) {
    lineUp = lineUp.filter(artist => topArtists.includes(cleanStr(artist.name)))
  }
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
                <p className={cleanStr(artist.name) == name ? "artist-selected" : "artist-name"}  onClick={selectArtist} id={artist.name} key={artist.performerId}>{artist.name}</p>
                </span>
                {cleanStr(artist.name) == name && !removedArtists.includes(index)  ? <p className="add-remove" id={index} onClick={removeArtist}> remove </p> : <></>}
                {cleanStr(artist.name) == name && removedArtists.includes(index)  ? <p className="add-remove" id={index} onClick={addArtist}> add </p> : <></>}
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
