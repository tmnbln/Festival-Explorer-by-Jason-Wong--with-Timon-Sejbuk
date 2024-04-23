import '../App.css'
import { useState } from 'react';

function Tracks({ tracks }) {
  
  // initialise use states to track what is playing and set audio 
  const [nowPlaying, setNowPlaying] = useState('');  
  const [audio, setAudio] = useState(new Audio());
  if (audio) audio.play();

  // limit number of tracks displayed;
  tracks = tracks.slice(0, 5);

  // toggle playback based on user selecting track
  const playTrack = async (e) => {
    if (audio) audio.pause();
    if (nowPlaying == e.target.innerHTML) {
      setAudio(new Audio());
      setNowPlaying('');
    } else {
      setAudio(new Audio(e.target.id));
      setNowPlaying(e.target.innerHTML);
      setTimeout(() => {
        setAudio(new Audio());
        setNowPlaying('');
      }, 30000);
    }
  }

  return (
    <div className="tracks">
      <h3>Top Tracks</h3>
      {tracks.length && 
        <div >
          {tracks.map((track) => <p className={track.name == nowPlaying ? "track-selected" : "track-name"} onClick={playTrack} id={track.preview_url} key={track.id}>{track.name}</p>)}
        </div>
      }   
    </div>
  )
}

export default Tracks
