import '../App.css'
import { useState, useEffect } from 'react';


function Tracks({tracks}) {

  const handleClick = (e) => {
    console.log('click');
    console.log(e.target.id);
  }

  return (
    <div className="Tracks">
      <h3>Tracks</h3>
      {tracks.length === 0 ? <></> :
        <ul>
          {tracks.map((track) => <p onClick={handleClick} id={track.id} key={track.id}>{track.name}</p>)}
        </ul>
      }   
    </div>
  )
}

export default Tracks
