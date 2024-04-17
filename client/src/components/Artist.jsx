import '../App.css'
import { useState, useEffect } from 'react';


function Artist({artist}) {

  console.log('IN ARTIST, ', artist);

  return (
    <div className="Artist">
      <h3>Artist</h3>
      {!artist ? <></> :
        <>
          <p>{artist.name}</p>
          <img src={artist.images[0].url}></img>
        </>
      }   
    </div>
  )
}

export default Artist
