import '../App.css'
import { useState, useEffect } from 'react';


function Tracks({tracks}) {

  const playTrack = (e) => {
    console.log(e.target.id);
    let audio = new Audio(e.target.id)
  
    const play = () => {
      audio.play()
    }

    play();

  }

  return (
    <div className="Tracks">
      <h3>Tracks</h3>
      {tracks.length === 0 ? <></> :
        <ul>
          {tracks.map((track) => <p onClick={playTrack} id={track.preview_url} key={track.id}>{track.name}</p>)}
        </ul>
      }   
    </div>
  )
}

export default Tracks
