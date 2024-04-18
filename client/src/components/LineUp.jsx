import '../App.css'
import { useState, useEffect } from 'react';

function LineUp({lineUp, getArtist}) {

  const selectArtist = (e) => {
    console.log(e.target.id);
    getArtist(e.target.id);
  }

  return (
    <div className="Line Up">
      <h3>Line Up</h3>
      {lineUp.length === 0 ? <></> :
        <div>
          {lineUp.map((artist) => <p onClick={selectArtist} id={artist.name} key={artist.id}>{artist.name}</p>) }
        </div>
      }   
    </div>
  )
}

export default LineUp
