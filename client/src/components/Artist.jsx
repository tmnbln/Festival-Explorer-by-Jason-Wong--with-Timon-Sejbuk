import '../App.css'
import helpers from '../helpers/helpers';

function Artist({ artist }) {

  return (
    <div className="artist">
      {artist && <div className="artist-container">
          <img src={artist.images[0].url}></img>
          <h2>{artist.name}</h2>
          <p>{helpers.formatNumber(artist.followers.total)} followers</p>
        </div>
      }   
    </div>
  )
}

export default Artist
