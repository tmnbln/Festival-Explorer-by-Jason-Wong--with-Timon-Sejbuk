import '../App.css'
import { useState, useEffect } from 'react';


function RelatedArtists({ relatedArtists }) {
  
  const [displayIndex, setDisplayIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setDisplayIndex((displayIndex + 1) % relatedArtists.length), 3000);
    return () => {
      clearInterval(interval);
    }
  });

  relatedArtists = relatedArtists.slice(0, 5);

  return (
    <div className="related-artists">
      <h3>Related Artists</h3>
      {relatedArtists.length === 0 ? <></> :
        <div className="related-artists-container">
          <div>
            {relatedArtists.map((artist, index) => <p id={index} key={artist.id} className={index === displayIndex ? `selected-related-artist` : null}>{artist.name}</p>) }
          </div>
          <div className="related-artist-selected">
            {relatedArtists.length ? <img src={relatedArtists[displayIndex].images[0].url}></img> : <></>}
          </div>
        </div>
      }   
    </div>
  )
}

export default RelatedArtists
