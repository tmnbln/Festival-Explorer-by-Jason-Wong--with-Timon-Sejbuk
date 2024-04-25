import '../App.css';
import { useState, useEffect } from 'react';

function Tracks({ tracks }) {
  const [nowPlaying, setNowPlaying] = useState('');  
  const [audioSrc, setAudioSrc] = useState('');

  // limit to 5 tracks
  const limitedTracks = tracks.slice(0, 5);

  // play and stop
  const playTrack = (track) => {
    if (nowPlaying === track.name) {
      setAudioSrc(''); // stop
      setNowPlaying('');
    } else {
      setAudioSrc(track.preview_url); // url to play
      setNowPlaying(track.name); // now playing
    }
  };

  useEffect(() => {
    // reset audio
    return () => {
      setAudioSrc('');
      setNowPlaying('');
    };
  }, []);

  return (
    <div className="tracks">
      <h3>Top Tracks</h3>
      {limitedTracks.length > 0 && (
        <div>
          {limitedTracks.map((track) => (
            <p
              className={track.name === nowPlaying ? "track-selected" : "track-name"}
              onClick={() => playTrack(track)}
              key={track.id}
            >
              {track.name}
            </p>
          ))}
        </div>
      )}
      {audioSrc && (
        <audio controls autoPlay>
          <source src={audioSrc} type="audio/mpeg" />
          🦆 Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default Tracks;
