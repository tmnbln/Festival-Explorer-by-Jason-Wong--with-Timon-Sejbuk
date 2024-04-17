import '../App.css'
import { useState, useEffect } from 'react';


function RelatedArtists({relatedArtists}) {

  return (
    <div className="RelatedArtists">
      <h3>RelatedArtists</h3>
      {relatedArtists.length === 0 ? <></> :
        <ul>
          { relatedArtists.map((artist) => <p key={artist.id}>{artist.name}</p>) }
        </ul>
      }   
    </div>
  )
}

export default RelatedArtists
