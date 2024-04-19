import '../App.css'
import { useState, useEffect } from 'react';


function formatNumber(num) {
  return Math.abs(Number(num)) >= 1.0e+9
       ? Math.round(Math.abs(Number(num)) / 1.0e+9 * 10) / 10 + " Billion"
       : Math.abs(Number(num)) >= 1.0e+6
       ? Math.round(Math.abs(Number(num)) / 1.0e+6 * 10) / 10 + " Million"
       : Math.abs(Number(num)) >= 1.0e+3
       ? Math.round(Math.abs(Number(num)) / 1.0e+3) + " Thousand"
       : Math.abs(Number(num));
   }

function Artist({artist}) {

  return (
    <div className="artist">
      {!artist ? <></> :
        <div className="artist-container">
          <img src={artist.images[0].url}></img>
          <h2>{artist.name}</h2>
          <p>{formatNumber(artist.followers.total)} FOLLOWERS</p>
        </div>
      }   
    </div>
  )
}

export default Artist
