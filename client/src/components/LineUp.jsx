import '../App.css'
import { useState, useEffect } from 'react';

function LineUp({ lineUp, getArtist, setArtist, topArtists}) {
  
  const selectArtist = (e) => {
    getArtist(e.target.id, setArtist);
  }

  const shuffleArtist = () => {
    const index = Math.floor(Math.random() * lineUp.length);
    getArtist(lineUp[index].name, setArtist);
  }


  return (
    <div className="lineup">
      {lineUp.length === 0 ? <></> :
        <div>
          <p onClick={shuffleArtist}>Shuffle</p>
          {lineUp.map((artist) => <p onClick={selectArtist} id={artist.name} key={artist.performerId}>{artist.name}</p>) }
        </div>
      }   
    </div>
  )
}

export default LineUp
