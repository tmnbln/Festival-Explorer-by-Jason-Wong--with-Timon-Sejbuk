import '../App.css'
import { useState, useEffect } from 'react';

function LineUp({ lineUp, getArtist, setArtist }) {
  
  const selectArtist = (e) => {
    getArtist(e.target.id, setArtist);
  }

  return (
    <div className="Line Up">
      <h3>Line Up</h3>
      {lineUp.length === 0 ? <></> :
        <div>
          {lineUp.map((artist) => <p onClick={selectArtist} id={artist.name} key={artist.performerId}>{artist.name}</p>) }
        </div>
      }   
    </div>
  )
}

export default LineUp
