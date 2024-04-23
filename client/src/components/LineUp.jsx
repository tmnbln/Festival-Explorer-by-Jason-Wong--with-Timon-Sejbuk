import '../App.css'
import { useState } from 'react';
import Filter from './Filter';
import { genreObj } from '../assets/genres';
import helpers from '../helpers/helpers';
const cleanStr = helpers.cleanStr;

function LineUp({ props }) {

  // destructure props 
  let {artist, lineUp, topArtists, setNewArtist, removedArtists, setRemovedArtists, setTracks, setRelatedArtists} = props

  // initialise use states 
  const [filterByGenre, setFilterByGenre] = useState('');
  const [filterByHeadliners, setFilterByHeadliners] = useState(false);
  const [filterByTop, setFilterByTop] = useState(false);


  // clean name data to enable accurate comparison between data sources  
  let cleanName = undefined
  if (artist) cleanName = cleanStr(artist.name);
  if (topArtists.length) topArtists = topArtists.map(artist => cleanStr(artist));


  // set new artist by clicking artist name 
  const selectArtist = async (e) => {
    const artistName = e.target.innerHTML;
    setNewArtist(artistName);
  }


  // remove artist from line-up 
  const removeArtist = (e) => {
    const artistIndex = e.target.id;
    setRemovedArtists([...removedArtists, Number(artistIndex)]);
  }


  // add artist back into line-up (for those previously removed) 
  const addArtist = (e) => {
    const artistIndex = e.target.id;
    setRemovedArtists(removedArtists.filter(x => x!= Number(artistIndex)));
  }
  

  // filter line-up displayed based on filters selected 
  if (filterByHeadliners) lineUp = lineUp.filter(artist => artist.isHeadliner);
  if (filterByTop) lineUp = lineUp.filter(artist => topArtists.includes(cleanStr(artist.name)));
  if (filterByGenre != '') lineUp = lineUp.filter(artist => artist.genre.includes(genreObj[filterByGenre]));
  

  // define props - filter component  
  const filterProps = {
    lineUp, 
    setNewArtist,
    filterByHeadliners,
    setFilterByHeadliners,
    filterByTop,
    setFilterByTop,
    filterByGenre,
    setFilterByGenre,
    removedArtists
  }

  return (
    <>
      <Filter props={{ ...filterProps }}/>
      <div className="lineup">
      {lineUp.length && 
        <div>
          {lineUp.map((artist, index) =>
            <>
              <div key={artist.id} className="artist-item">
                <span className={removedArtists.includes(index) ? "artist-deleted" : null}>
                  <p className={cleanStr(artist.name) == cleanName ? "artist-selected" : "artist-name"}  onClick={selectArtist} key={artist.performerId}>{artist.name}</p>
                </span>
                {cleanStr(artist.name) == cleanName && !removedArtists.includes(index)  ? <p className="add-remove" id={index} onClick={removeArtist}> remove </p> : <></>}
                {cleanStr(artist.name) == cleanName && removedArtists.includes(index)  ? <p className="add-remove" id={index} onClick={addArtist}> add </p> : <></>}
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
