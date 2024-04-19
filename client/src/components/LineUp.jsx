import '../App.css'
import { useState, useEffect } from 'react';

function LineUp({artist, lineUp, getArtist, setArtist, topArtists, removedArtists, setRemovedArtists}) {
  
  console.log(removedArtists);

  let name = artist.name 
  const selectArtist = (e) => {
    getArtist(e.target.id, setArtist);
  }

  const shuffleArtist = () => {
    const index = Math.floor(Math.random() * lineUp.length);
    getArtist(lineUp[index].name, setArtist);
  }

  const removeArtist = (e) => {
    setRemovedArtists([...removedArtists, Number(e.target.id)]);
  }
  const addArtist = (e) => {
    console.log(e.target.id)
    setRemovedArtists(removedArtists.filter(x => x!= Number(e.target.id)));
    // setRemovedArtists([...removedArtists, Number(e.target.id)]);
  }

  return (
    <div className="lineup">
      {lineUp.length === 0 ? <></> :
        <div>
          <p id="shuffle-button" onClick={shuffleArtist}>Shuffle</p>
          {lineUp.map((artist, index) =>
            <>
            
              <div className="artist-item">
                <span className={removedArtists.includes(index) ? "artist-deleted" : null}>
                <p className={artist.name == name ? "artist-selected" : "artist-name"}  onClick={selectArtist} id={artist.name} key={artist.performerId}>{artist.name}</p>
                </span>
                {artist.name == name && !removedArtists.includes(index)  ? <p className="add-remove" id={index} onClick={removeArtist}> remove </p> : <></>}
                {artist.name == name && removedArtists.includes(index)  ? <p className="add-remove" id={index} onClick={addArtist}> add </p> : <></>}
                {/* <p> {removedArtists.includes(index) ? "DELETED" : ""}</p> */}
              </div>
            
            </>
          )}
        </div>
      }   
    </div>
  )
}

export default LineUp
