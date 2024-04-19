import '../App.css'
import { useState, useEffect } from 'react';


function RelatedArtists({relatedArtists}) {

  return (
    <div className="relatedArtists">
      <h3>RelatedArtists</h3>
      {relatedArtists.length === 0 ? <></> :
        <div>
          { relatedArtists.map((artist) => <p key={artist.id}>{artist.name}</p>) }
        </div>
      }   
    </div>
  )
}

export default RelatedArtists
