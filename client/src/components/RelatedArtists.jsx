import '../App.css'
import { useState, useEffect } from 'react';

function RelatedArtists({ relatedArtists }) {
  
  // initialise state to track which related artists is highlighted 
  const [displayIndex, setDisplayIndex] = useState(0)

  // limit how many related artists are shown 
  relatedArtists = relatedArtists.slice(0, 5);
  
  // iterate through related artists based on interval timing
  useEffect(() => {
    const interval = setInterval(() => setDisplayIndex((displayIndex + 1) % relatedArtists.length), 3000);
    return () => {
      clearInterval(interval);
    }
  });

  return (
    <div className="related-artists">
      <h3>Related Artists</h3>
      {relatedArtists.length && <div className="related-artists-container">
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
